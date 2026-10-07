import React from "react";
import { createRoot } from "react-dom/client";
import * as OrbModule from "@/components/orbs/orb-01";
import "./index.css";

const OrbComponent = Object.values(OrbModule).find(
  (value) => typeof value === "function"
) as React.ComponentType<Record<string, unknown>> | undefined;

function App() {
  if (!OrbComponent) {
    return <div>ORB-01 module exposed no renderable component.</div>;
  }

  return (
    <main style={{
      width: "100%",
      height: 420,
      display: "grid",
      placeItems: "center",
      overflow: "hidden",
      background: "transparent"
    }}>
      <div style={{ width: 360, height: 360, maxWidth: "88vw", maxHeight: "88vw" }}>
        <OrbComponent />
      </div>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
