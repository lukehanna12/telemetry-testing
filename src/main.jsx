import React,{useState} from "react";
import{createRoot}from"react-dom/client";
import"./style.css";
function App(){const[n,setN]=useState(0);return <main><p className="eyebrow">Quintus end-to-end</p><h1>Build plane healthy</h1><p>This artifact was constructed in a Quintus workspace and built by the external GitHub Actions plane.</p><button onClick={()=>setN(n+1)}>Interaction test: {n}</button></main>}
createRoot(document.getElementById("root")).render(<App/>);