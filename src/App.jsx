import { useState } from "react";

const Arrow = () => <span aria-hidden="true">↗</span>;

function Nav({active,setActive}) {
  const items=[["nocturne","Nocturne"],["folio","Folio"],["kinetic","Kinetic"]];
  return <nav className="switcher" aria-label="Design directions">
    <div className="switcher-brand">03 / STUDIES</div>
    <div className="switcher-items">
      {items.map(([id,label],i)=><button key={id} className={active===id?"active":""} onClick={()=>setActive(id)}>
        <span>0{i+1}</span>{label}
      </button>)}
    </div>
  </nav>;
}

function Nocturne(){
 return <section className="scene nocturne">
   <div className="n-noise"/>
   <header className="n-nav">
     <div className="n-mark">AURORA/8</div>
     <div className="n-links"><span>Work</span><span>Studio</span><span>Field notes</span></div>
     <button className="n-pill">Start a project <Arrow/></button>
   </header>
   <div className="n-orb orb-a"/><div className="n-orb orb-b"/>
   <main className="n-main">
     <p className="n-kicker">Independent creative technology studio · 2026</p>
     <h1>Ideas with<br/><em>gravity.</em></h1>
     <div className="n-bottom">
       <p>We shape identities, interfaces, and digital systems for teams building what comes next.</p>
       <div className="n-metrics">
         <div><b>27</b><span>launches</span></div>
         <div><b>14</b><span>countries</span></div>
         <div><b>06</b><span>awards</span></div>
       </div>
     </div>
   </main>
   <aside className="n-card">
      <div className="n-card-top"><span>Featured / 004</span><span>2026</span></div>
      <div className="n-card-art"><i/><i/><i/></div>
      <h3>Atmospheric computing</h3>
      <p>Visual identity · Product system</p>
   </aside>
 </section>
}

function Folio(){
 return <section className="scene folio">
   <header className="f-head">
     <div className="f-logo">OBJECT<br/>MATTER</div>
     <div className="f-index">Independent design office<br/>Chicago · New York · Remote</div>
     <button className="f-menu">INDEX <span>↘</span></button>
   </header>
   <div className="f-rule"/>
   <main className="f-grid">
      <div className="f-title">
        <span className="f-num">01</span>
        <h1>We make useful<br/>things <i>beautiful.</i></h1>
      </div>
      <div className="f-note">
        <span>EST. 2018</span>
        <p>Brand systems, digital products, and environments built with rigor, restraint, and a little mischief.</p>
      </div>
      <div className="f-poster">
        <div className="f-poster-type">FORM<br/><i>FOLLOWS</i><br/>FEELING</div>
        <div className="f-circle">+</div>
        <div className="f-stamp">OM<br/>26</div>
      </div>
      <div className="f-list">
        <span className="f-num">02 / SELECTED</span>
        {["Fieldwork — Identity","Monument — Digital","Arc House — Environment","Tomorrow Lab — Strategy"].map((x,i)=>
          <div className="f-row" key={x}><span>{String(i+1).padStart(2,"0")}</span><b>{x}</b><Arrow/></div>)}
      </div>
   </main>
 </section>
}

function Kinetic(){
 return <section className="scene kinetic">
   <header className="k-head">
     <div className="k-logo">VOLT<span>!</span></div>
     <div className="k-tag">Creative systems<br/>for ambitious brands</div>
     <button className="k-talk">LET'S TALK <Arrow/></button>
   </header>
   <main className="k-main">
     <div className="k-badge">NO BORING<br/>BRANDS<br/>ALLOWED</div>
     <h1><span>MAKE</span><span>NOISE.</span></h1>
     <div className="k-copy">
       <p>Strategy, identity, digital, campaigns. Built to get noticed and impossible to confuse.</p>
       <button>SEE THE WORK <span>→</span></button>
     </div>
     <div className="k-shape shape-one"/><div className="k-shape shape-two"/><div className="k-shape shape-three"/>
   </main>
   <footer className="k-ticker"><div>BRAND SYSTEMS ★ DIGITAL EXPERIENCES ★ CAMPAIGNS ★ CULTURE ★ BRAND SYSTEMS ★ DIGITAL EXPERIENCES ★ CAMPAIGNS ★ CULTURE ★</div></footer>
 </section>
}

export default function App(){
 const [active,setActive]=useState("nocturne");
 return <div className={"app theme-"+active}>
   <Nav active={active} setActive={setActive}/>
   <div className="canvas">
    {active==="nocturne"?<Nocturne/>:active==="folio"?<Folio/>:<Kinetic/>}
   </div>
 </div>
}
