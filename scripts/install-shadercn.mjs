import fs from "node:fs/promises";
import path from "node:path";
import { execFileSync } from "node:child_process";

const rootRegistry = "https://shadercn.run/r/";
const installed = new Set();
const npmDeps = new Set();

async function getJson(url) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`GET ${url} -> ${res.status}`);
  return await res.json();
}

function normalizeTarget(file, item) {
  let target = file.target || "";
  if (!target) {
    const name = path.basename(file.path || `${item.name}.tsx`);
    target = `components/ui/${name}`;
  }
  target = target.replace(/^\/+/, "");
  return target.startsWith("src/") ? target : `src/${target}`;
}

async function resolveDependency(dep) {
  if (/^https?:\/\//.test(dep)) return dep;
  const bare = dep.replace(/^@[^/]+\//, "").replace(/\.json$/, "");
  const shaderUrl = `${rootRegistry}${bare}.json`;
  try {
    await getJson(shaderUrl);
    return shaderUrl;
  } catch {}
  return `https://ui.shadcn.com/r/styles/new-york/${bare}.json`;
}

async function installItem(url) {
  if (installed.has(url)) return;
  installed.add(url);
  const item = await getJson(url);
  console.log("registry-item", item.name, url);

  for (const dep of item.dependencies || []) npmDeps.add(dep);
  for (const dep of item.devDependencies || []) npmDeps.add(dep);

  for (const dep of item.registryDependencies || []) {
    const depUrl = await resolveDependency(dep);
    await installItem(depUrl);
  }

  for (const file of item.files || []) {
    if (typeof file.content !== "string") continue;
    const target = normalizeTarget(file, item);
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, file.content, "utf8");
    console.log("wrote", target);
  }
}

await installItem(`${rootRegistry}orb-01.json`);

if (npmDeps.size) {
  const deps = [...npmDeps];
  console.log("npm-dependencies", deps.join(" "));
  execFileSync("npm", ["install", "--no-audit", "--no-fund", ...deps], { stdio: "inherit" });
}
