import React from "react";
import { createRoot } from "react-dom/client";
import { OrbPreview } from "@/components/ui/orb-01";
import "./index.css";

function App() {
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
        <OrbPreview />
      </div>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
