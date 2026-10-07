import React, {useMemo, useState} from "react";
import {createRoot} from "react-dom/client";
import {
  ArrowRight, Bot, BrainCircuit, Boxes, CheckCircle2, ChevronRight,
  CircleDollarSign, Cpu, FileText, FlaskConical, Gauge, Globe2, Layers3,
  Lightbulb, Menu, Network, Play, Rocket, Search, ShieldCheck, Sparkles,
  Target, Users, X, Zap
} from "lucide-react";
import "./styles.css";

const problems = [
  {id:1,title:"Autonomous Lake Waste Collector",category:"Environment",difficulty:"Advanced",budget:25000,ideas:12,teams:4,progress:78,tag:"Featured"},
  {id:2,title:"Low-Cost Crop Disease Rover",category:"Agriculture",difficulty:"Intermediate",budget:18000,ideas:9,teams:3,progress:54,tag:"New"},
  {id:3,title:"Indoor Elderly Assistance Robot",category:"Healthcare",difficulty:"Advanced",budget:40000,ideas:17,teams:5,progress:43,tag:"Research"},
  {id:4,title:"Smart Warehouse Picking Arm",category:"Industry",difficulty:"Advanced",budget:55000,ideas:21,teams:7,progress:67,tag:"Popular"},
  {id:5,title:"Flood Rescue Supply Rover",category:"Disaster",difficulty:"Advanced",budget:32000,ideas:8,teams:2,progress:31,tag:"Urgent"},
  {id:6,title:"Campus Autonomous Delivery Bot",category:"Smart City",difficulty:"Intermediate",budget:22000,ideas:14,teams:6,progress:61,tag:"Open"}
];

const solutions = [
  {name:"AquaBot v2", team:"RoboInnovators", problem:"Lake Waste Collector", score:91, cost:18450, status:"Prototype"},
  {name:"AgriScout", team:"Green Machines", problem:"Crop Disease Rover", score:88, cost:14600, status:"Simulation"},
  {name:"CareMate", team:"Assistive Labs", problem:"Elderly Assistance", score:86, cost:32100, status:"Design"},
];

function App(){
  const [active, setActive] = useState("home");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [modal, setModal] = useState(null);
  const [mobile, setMobile] = useState(false);

  const filtered = useMemo(()=>problems.filter(p =>
    `${p.title} ${p.category} ${p.difficulty}`.toLowerCase().includes(query.toLowerCase())
  ),[query]);

  const go = (page) => {setActive(page); setMobile(false); window.scrollTo({top:0,behavior:"smooth"});};

  return <div className="app">
    <header className="nav">
      <button className="brand" onClick={()=>go("home")}>
        <span className="brand-mark"><Bot size={21}/></span>
        <span>Robo<span>Solve</span></span>
      </button>
      <nav className={mobile?"nav-links open":"nav-links"}>
        {["home","problems","solutions","lab","teams"].map(x =>
          <button key={x} className={active===x?"active":""} onClick={()=>go(x)}>{x[0].toUpperCase()+x.slice(1)}</button>
        )}
        <button className="nav-cta" onClick={()=>setModal("problem")}>Submit a Problem <ArrowRight size={16}/></button>
      </nav>
      <button className="menu" onClick={()=>setMobile(!mobile)}>{mobile?<X/>:<Menu/>}</button>
    </header>

    {active==="home" && <Home go={go} setModal={setModal} />}
    {active==="problems" && <Problems items={filtered} query={query} setQuery={setQuery} setSelected={setSelected} />}
    {active==="solutions" && <Solutions />}
    {active==="lab" && <Lab />}
    {active==="teams" && <Teams />}

    {selected && <ProblemModal problem={selected} close={()=>setSelected(null)} />}
    {modal==="problem" && <SubmitModal close={()=>setModal(null)} />}
    <footer className="footer">
      <div><div className="brand footer-brand"><span className="brand-mark"><Bot size={19}/></span><span>Robo<span>Solve</span></span></div><p>Open innovation for real-world robotics.</p></div>
      <div className="footer-links"><span>Challenges</span><span>Solutions</span><span>Robotics Lab</span><span>Community</span></div>
      <small>© 2026 RoboSolve. Prototype platform.</small>
    </footer>
  </div>
}

function Home({go,setModal}){
  return <main>
    <section className="hero">
      <div className="hero-grid"/>
      <div className="hero-copy">
        <div className="eyebrow"><span className="pulse"/> OPEN INNOVATION ROBOTICS PLATFORM</div>
        <h1>Real problems.<br/><em>Robotic solutions.</em></h1>
        <p className="hero-lead">RoboSolve connects real-world challenges with innovators, engineering teams and intelligent robotics workflows — from the first idea to a validated prototype.</p>
        <div className="hero-actions">
          <button className="primary" onClick={()=>go("problems")}>Explore challenges <ArrowRight size={18}/></button>
          <button className="secondary" onClick={()=>setModal("problem")}>Submit a problem <Lightbulb size={18}/></button>
        </div>
        <div className="trust-row"><ShieldCheck size={16}/> Built for students, researchers, startups and industry teams</div>
      </div>
      <div className="hero-visual">
        <div className="orbit o1"/><div className="orbit o2"/>
        <div className="robot-card">
          <div className="robot-top"><span>ROBOT / 04</span><span className="status-dot">LIVE</span></div>
          <div className="robot-art">
            <div className="bot-head"><span/><span/></div>
            <div className="bot-body"><div className="sensor"/><div className="panel-lines"/></div>
            <div className="leg l1"/><div className="leg l2"/>
            <div className="arm a1"/><div className="arm a2"/>
          </div>
          <div className="telemetry"><div><small>MISSION</small><b>Prototype</b></div><div><small>EFFICIENCY</small><b>91.4%</b></div><div><small>BATTERY</small><b>82%</b></div></div>
        </div>
        <div className="floating-chip chip-a"><Target size={16}/> Lake collection</div>
        <div className="floating-chip chip-b"><BrainCircuit size={16}/> AI route planner</div>
        <div className="floating-chip chip-c"><Gauge size={16}/> 1.4 m/s</div>
      </div>
    </section>

    <section className="stats">
      {[["1,248","Open problems"],["684","Proposed solutions"],["327","Active teams"],["92","Prototypes"]].map(([n,l])=><div key={l}><strong>{n}</strong><span>{l}</span></div>)}
    </section>

    <section className="section">
      <div className="section-head"><div><span className="kicker">THE WORKFLOW</span><h2>From challenge to impact.</h2></div><button className="text-btn" onClick={()=>go("problems")}>Explore all <ArrowRight size={16}/></button></div>
      <div className="workflow">
        {[
          [Target,"01","Problem","Define a real-world challenge with measurable requirements."],
          [Lightbulb,"02","Idea","Bring together diverse ideas and engineering approaches."],
          [Boxes,"03","Design","Build the robot architecture, components and algorithms."],
          [FlaskConical,"04","Validate","Simulate, test, compare and move toward deployment."]
        ].map(([I,n,t,d])=><div className="workflow-card" key={n}><span className="step">{n}</span><I size={27}/><h3>{t}</h3><p>{d}</p><ChevronRight className="flow-arrow"/></div>)}
      </div>
    </section>

    <section className="feature-band">
      <div><span className="kicker">ROBOTICS LAB</span><h2>Design before you build.</h2><p>Configure a robot, select sensors and actuators, estimate cost and run a lightweight simulation — all inside the project workspace.</p><button className="primary" onClick={()=>go("lab")}>Open Robotics Lab <Rocket size={17}/></button></div>
      <div className="lab-preview"><div className="grid-map"><div className="route"/><div className="sim-bot">🤖</div><div className="target">◆</div><i/><i/><i/></div><div className="lab-metrics"><span>PATH <b>18.2 m</b></span><span>BATTERY <b>82%</b></span><span>STATUS <b className="green">READY</b></span></div></div>
    </section>

    <section className="section">
      <div className="section-head"><div><span className="kicker">FEATURED CHALLENGES</span><h2>Problems worth solving.</h2></div><button className="text-btn" onClick={()=>go("problems")}>View marketplace <ArrowRight size={16}/></button></div>
      <div className="problem-grid">{problems.slice(0,3).map(p=><ProblemCard key={p.id} p={p} setSelected={()=>{}} />)}</div>
    </section>

    <section className="cta">
      <div className="cta-glow"/><span className="kicker">OPEN INNOVATION</span><h2>Have a problem that needs a robot?</h2><p>Publish the challenge. Let engineers, students and innovators build the solution.</p><button className="primary" onClick={()=>setModal("problem")}>Create a challenge <ArrowRight size={18}/></button>
    </section>
  </main>
}

function ProblemCard({p,setSelected}){
  return <article className="problem-card" onClick={()=>setSelected&&setSelected(p)}>
    <div className="card-top"><span className="tag">{p.tag}</span><span className="category">{p.category}</span></div>
    <h3>{p.title}</h3><p>Design an autonomous robotic system that meets measurable real-world constraints.</p>
    <div className="card-meta"><span><CircleDollarSign size={15}/>₹{p.budget.toLocaleString()}</span><span><Users size={15}/>{p.teams} teams</span><span><Lightbulb size={15}/>{p.ideas} ideas</span></div>
    <div className="progress-label"><span>Progress</span><b>{p.progress}%</b></div><div className="progress"><i style={{width:p.progress+"%"}}/></div>
    <button className="card-link">View challenge <ArrowRight size={15}/></button>
  </article>
}

function Problems({items,query,setQuery,setSelected}){
  const [cat,setCat]=useState("All");
  const cats=["All","Environment","Agriculture","Healthcare","Industry","Disaster","Smart City"];
  const visible=items.filter(p=>cat==="All"||p.category===cat);
  return <main className="page"><div className="page-hero"><span className="kicker">PROBLEM MARKETPLACE</span><h1>Challenges waiting<br/><em>for better robots.</em></h1><p>Explore open engineering problems and find where your skills can create measurable impact.</p></div>
    <div className="toolbar"><div className="search"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search problems, domains, technologies..."/></div><div className="filters">{cats.map(c=><button className={cat===c?"selected":""} onClick={()=>setCat(c)} key={c}>{c}</button>)}</div></div>
    <div className="problem-grid full">{visible.map(p=><ProblemCard key={p.id} p={p} setSelected={setSelected}/>)}</div>
  </main>
}

function ProblemModal({problem,close}){
  return <div className="overlay" onClick={close}><div className="modal large" onClick={e=>e.stopPropagation()}><button className="close" onClick={close}><X/></button><span className="kicker">{problem.category} · {problem.difficulty}</span><h2>{problem.title}</h2><p className="modal-lead">Build an autonomous solution that removes floating plastic waste while protecting aquatic life.</p><div className="modal-grid"><div><h4>Success criteria</h4><ul><li>Autonomous navigation</li><li>Plastic detection and collection</li><li>Obstacle avoidance</li><li>Minimum 4-hour operation</li></ul></div><div><h4>Challenge data</h4><div className="data-row"><span>Budget</span><b>₹{problem.budget.toLocaleString()}</b></div><div className="data-row"><span>Ideas</span><b>{problem.ideas}</b></div><div className="data-row"><span>Teams</span><b>{problem.teams}</b></div><div className="data-row"><span>Progress</span><b>{problem.progress}%</b></div></div></div><button className="primary wide" onClick={close}>Propose a solution <ArrowRight size={17}/></button></div></div>
}

function SubmitModal({close}){
  const [sent,setSent]=useState(false);
  return <div className="overlay" onClick={close}><div className="modal" onClick={e=>e.stopPropagation()}><button className="close" onClick={close}><X/></button>{sent?<><CheckCircle2 className="success-icon"/><h2>Challenge submitted.</h2><p>Thanks. Your problem has been added to the review queue.</p><button className="primary wide" onClick={close}>Done</button></>:<><span className="kicker">NEW CHALLENGE</span><h2>Submit a real-world problem.</h2><label>Problem title<input placeholder="e.g. Autonomous campus delivery"/></label><label>Category<select><option>Environment</option><option>Agriculture</option><option>Healthcare</option><option>Industry</option><option>Disaster</option></select></label><label>Problem statement<textarea placeholder="What needs to be solved?"/></label><label>Estimated budget<input placeholder="₹ 25,000"/></label><button className="primary wide" onClick={()=>setSent(true)}>Submit challenge <ArrowRight size={17}/></button></>}</div></div>
}

function Solutions(){
  return <main className="page"><div className="page-hero compact"><span className="kicker">SOLUTION NETWORK</span><h1>Ideas becoming<br/><em>working machines.</em></h1><p>Explore proposed approaches, compare engineering decisions and follow projects from concept to prototype.</p></div><div className="solution-list">{solutions.map((s,i)=><article className="solution-row" key={s.name}><div className="solution-num">0{i+1}</div><div className="solution-main"><span className="kicker">{s.status}</span><h3>{s.name}</h3><p>{s.problem} · Built by {s.team}</p></div><div className="solution-score"><strong>{s.score}%</strong><span>validation score</span></div><div className="solution-cost"><span>Estimated cost</span><b>₹{s.cost.toLocaleString()}</b></div><ArrowRight/></article>)}</div></main>
}

function Lab(){
  const [speed,setSpeed]=useState(55); const [running,setRunning]=useState(false); const [obstacle,setObstacle]=useState(true);
  return <main className="page"><div className="page-hero compact"><span className="kicker">ROBOTICS LAB · PROTOTYPE</span><h1>Design. Simulate.<br/><em>Learn faster.</em></h1><p>A browser-based engineering sandbox for configuring a robot and testing its mission logic.</p></div>
    <div className="lab-shell"><div className="sim-area"><div className="sim-toolbar"><span><span className="live-dot"/> SIMULATION</span><span>MISSION / 04</span></div><div className="sim-canvas"><div className="sim-grid"/>{obstacle&&<><div className="obs ob1"/><div className="obs ob2"/><div className="obs ob3"/></>}<div className={running?"sim-robot running":"sim-robot"} style={{"--speed":`${Math.max(.8,3.4-(speed/45))}s`}}>🤖<small>RT-01</small></div><div className="sim-target">TARGET</div><div className="sim-route"/></div><div className="sim-bottom"><button className="primary" onClick={()=>setRunning(!running)}>{running?<span>Pause mission</span>:<span><Play size={15}/> Run simulation</span>}</button><button className="secondary" onClick={()=>setRunning(false)}>Reset</button><span className="sim-state">{running?"RUNNING":"READY"}</span></div></div>
      <aside className="controls"><h3>Mission controls</h3><div className="control"><div><span>Movement speed</span><b>{speed}%</b></div><input type="range" min="10" max="100" value={speed} onChange={e=>setSpeed(+e.target.value)}/></div><div className="toggle-row"><span>Obstacle detection</span><button className={obstacle?"toggle on":"toggle"} onClick={()=>setObstacle(!obstacle)}><i/></button></div><div className="control-grid"><div><small>DISTANCE</small><b>18.2 m</b></div><div><small>BATTERY</small><b>82%</b></div><div><small>COLLISIONS</small><b>0</b></div><div><small>EFFICIENCY</small><b>91%</b></div></div><hr/><h4>Robot configuration</h4>{[["Controller","Raspberry Pi 5"],["Navigation","GPS + IMU"],["Vision","RGB Camera"],["Actuators","4 × DC Motor"]].map(x=><div className="config" key={x[0]}><span>{x[0]}</span><b>{x[1]}</b></div>)}</aside></div>
  </main>
}

function Teams(){
  const teams=[["RoboInnovators","AquaBot v2","Environment","12 members","91%"],["Green Machines","AgriScout","Agriculture","8 members","88%"],["Assistive Labs","CareMate","Healthcare","15 members","86%"],["Future Motion","CampusBot","Smart City","6 members","79%"]];
  return <main className="page"><div className="page-hero compact"><span className="kicker">COLLABORATION</span><h1>Build with people<br/><em>who solve.</em></h1><p>Discover engineering teams working across hardware, software, AI and mechanical design.</p></div><div className="team-grid">{teams.map((t,i)=><article className="team-card" key={t[0]}><div className="avatar-stack"><span>R</span><span>+</span></div><span className="kicker">{t[2]}</span><h3>{t[0]}</h3><p>{t[1]}</p><div className="team-bottom"><span>{t[3]}</span><b>{t[4]} score</b></div></article>)}</div></main>
}

createRoot(document.getElementById("root")).render(<App/>);
