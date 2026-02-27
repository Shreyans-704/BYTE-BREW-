import BeanText from "../components/BeanText";

/* ─── Star field data (generated once) ────────────────────── */
const stars = Array.from({length:180},(_,i)=>({
  id:i, x:Math.random()*100, y:Math.random()*100,
  r:Math.random()*1.8+0.3, o:Math.random()*0.7+0.3, d:Math.random()*3,
}));

/* ─── Coffee visualisation sub-components ─────────────────── */
function EspressoVis() {
  return (
    <div style={{ position:"relative",width:"100%",height:200,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",background:"radial-gradient(ellipse at 50% 80%,#3d1c0a,#1a0a04)" }}>
      <div style={{ position:"absolute",inset:0,opacity:0.2,backgroundImage:"radial-gradient(circle,#8B4513 1px,transparent 1px)",backgroundSize:"18px 18px" }} />
      <div style={{ filter:"drop-shadow(0 8px 24px rgba(0,0,0,0.7))" }}>
        <div style={{ width:64,height:48,borderRadius:"0 0 16px 16px",position:"relative",overflow:"hidden",background:"linear-gradient(135deg,#f5f0ea,#e8e0d5)",borderTop:"3px solid #d4ccc4" }}>
          <div style={{ position:"absolute",inset:0,background:"linear-gradient(to bottom,#2a0e04,#4a1a08)",borderRadius:"0 0 16px 16px" }} />
          <div style={{ position:"absolute",top:8,left:8,right:8,height:12,borderRadius:99,opacity:0.6,background:"radial-gradient(ellipse,#c8a882,transparent 70%)" }} />
        </div>
        <div style={{ position:"absolute",right:-16,top:8,width:20,height:24,borderRadius:"0 99px 99px 0",border:"3px solid #d4ccc4",borderLeft:"none" }} />
        <div style={{ width:80,height:8,borderRadius:99,margin:"0 auto",background:"linear-gradient(90deg,#c8c0b8,#e0d8d0,#c8c0b8)" }} />
      </div>
    </div>
  );
}

function LatteVis() {
  return (
    <div style={{ position:"relative",width:"100%",height:200,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",background:"radial-gradient(ellipse at 50% 80%,#1a3a4a,#0a1a24)" }}>
      <div style={{ filter:"drop-shadow(0 8px 24px rgba(0,0,0,0.7))",position:"relative" }}>
        <div style={{ width:80,height:64,borderRadius:"8px 8px 99px 99px",overflow:"hidden",background:"linear-gradient(135deg,#4a90c4,#2a6090)",border:"2px solid #5aa0d4" }}>
          <div style={{ position:"absolute",top:4,left:4,right:4,height:40,background:"linear-gradient(to bottom,#c8a882,#a07850)",display:"flex",alignItems:"center",justifyContent:"center" }}>
            <svg viewBox="0 0 60 50" style={{ width:48,height:40,opacity:0.9 }}>
              <ellipse cx="30" cy="25" rx="14" ry="20" fill="none" stroke="#f5e6cc" strokeWidth="1.5"/>
              <line x1="30" y1="5" x2="30" y2="45" stroke="#f5e6cc" strokeWidth="1"/>
              <line x1="22" y1="15" x2="30" y2="20" stroke="#f5e6cc" strokeWidth="0.8"/>
              <line x1="38" y1="15" x2="30" y2="20" stroke="#f5e6cc" strokeWidth="0.8"/>
            </svg>
          </div>
        </div>
        <div style={{ position:"absolute",right:-16,top:12,width:20,height:28,borderRadius:"0 99px 99px 0",border:"3px solid #5aa0d4",borderLeft:"none" }} />
        <div style={{ width:96,height:8,borderRadius:99,marginLeft:-8,background:"linear-gradient(90deg,#3a7ab0,#5aa0d4,#3a7ab0)" }} />
      </div>
    </div>
  );
}

function BeansVis() {
  return (
    <div style={{ position:"relative",width:"100%",height:200,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",background:"radial-gradient(ellipse at 50% 80%,#2d1a08,#120a02)" }}>
      {Array.from({length:24},(_,i)=>(
        <div key={i} style={{ position:"absolute",left:`${12+(i%6)*14+(Math.floor(i/6)%2)*7}%`,top:`${12+Math.floor(i/6)*24}%`,transform:`rotate(${(i*47)%180-90}deg)` }}>
          <div style={{ width:22,height:14,borderRadius:"50%",background:`hsl(22,70%,${20+(i%4)*6}%)`,position:"relative" }}>
            <div style={{ position:"absolute",top:"50%",left:0,right:0,height:1,background:`hsl(22,60%,${14+(i%4)*4}%)`,transform:"translateY(-50%)" }} />
          </div>
        </div>
      ))}
      <div style={{ position:"relative",zIndex:2,width:72,height:72,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(45,27,19,0.8)",border:"2px solid rgba(255,200,100,0.3)",fontSize:28 }}>☕</div>
    </div>
  );
}

/* ─── Featured brews data ──────────────────────────────────── */
const brews = [
  { title:"System Espresso", tag:"SINGLE ORIGIN", desc:"Ethiopia Yirgacheffe · 9-bar precision · The OS of great coffee.", price:"$4.20", V:EspressoVis, accent:"#c8902a" },
  { title:"Cloud Foam Lattes", tag:"MICRO-FOAM SERIES", desc:"Free-pour latte art · Blue ceramic · Silky oat milk at 65°C.", price:"$5.80", V:LatteVis, accent:"#60a5fa" },
  { title:"Open Source Beans", tag:"DARK ROAST · TRACEABLE", desc:"Blockchain-logged Colombian Huila. No secrets in the stack.", price:"$18.00", V:BeansVis, accent:"#00FF41" },
];

/* ─── Home Page ────────────────────────────────────────────── */
function PageHome({ navigate }) {
  return (
    <div className="page-fade">
      {/* HERO */}
      <section className="slant-bottom" style={{ background:"linear-gradient(175deg,#0a0f0a 0%,#111a0e 20%,#1a1208 50%,#2d1b13 80%,#3d2518 100%)", minHeight:"100vh", paddingBottom:140, position:"relative" }}>
        <div style={{ position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none" }}>
          {stars.map(s=>(
            <div key={s.id} style={{ position:"absolute",borderRadius:"50%",background:"white",left:`${s.x}%`,top:`${s.y*0.65}%`,width:s.r,height:s.r,opacity:s.o,animation:`twinkle ${2+s.d}s ${s.d}s ease-in-out infinite alternate` }} />
          ))}
          <div style={{ position:"absolute",top:"25%",left:"50%",transform:"translateX(-50%)",width:600,height:400,borderRadius:"50%",opacity:0.1,background:"radial-gradient(ellipse,#c8902a,transparent)" }} />
          <div style={{ position:"absolute",bottom:0,left:0,right:0,height:192,opacity:0.3,background:"linear-gradient(to top,#2d1b13,transparent)" }} />
        </div>
        <div style={{ position:"relative",zIndex:10,display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",padding:"128px 24px 32px" }}>
          <p className="hero-rise-1 fira" style={{ fontSize:11,letterSpacing:"0.5em",color:"#00FF41",marginBottom:24,opacity:0.8 }}>EST. 2024 &nbsp;·&nbsp; TECH-ARTISAN COFFEE</p>
          <div className="hero-rise-2" style={{ display:"flex",flexDirection:"column",alignItems:"center",width:"100%" }}>
            <BeanText word="BYTE" fontSize={130}/>
            <BeanText word="BREW" fontSize={130}/>
          </div>
          <div className="hero-rise-3" style={{ marginTop:8,marginBottom:24 }}>
            <h1 className="playfair" style={{ fontWeight:900,fontStyle:"italic",fontSize:"clamp(28px,5vw,52px)",color:"white",lineHeight:1.2,textShadow:"0 4px 30px rgba(0,0,0,0.6)" }}>
              Brewed to Digital Perfection.
            </h1>
            <div style={{ width:64,height:1.5,margin:"16px auto 0",opacity:0.6,background:"linear-gradient(90deg,transparent,#00FF41,transparent)" }} />
          </div>
          <p className="hero-rise-3 fira" style={{ fontSize:13,color:"#9ca3af",maxWidth:400,lineHeight:1.8,marginBottom:32 }}>
            {">"} Where every algorithm starts with the perfect cup.<br/>
            {">"} Single-origin beans · Precision extraction · Digital soul.
          </p>
          <div className="hero-rise-4" style={{ display:"flex",flexWrap:"wrap",gap:16,justifyContent:"center" }}>
            <button onClick={()=>{navigate("Menu");window.scrollTo(0,0);}} className="btn-green playfair" style={{ fontWeight:900,fontSize:16,padding:"14px 40px",borderRadius:999,border:"none",transition:"all 0.3s" }}>
              Explore Menu
            </button>
            <button onClick={()=>{navigate("Story");window.scrollTo(0,0);}} className="playfair"
              style={{ fontWeight:900,fontSize:16,padding:"14px 40px",borderRadius:999,border:"1px solid #57534e",color:"#d6d3d1",background:"none",transition:"all 0.3s" }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="#00FF41";e.currentTarget.style.color="#00FF41";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="#57534e";e.currentTarget.style.color="#d6d3d1";}}>
              Our Story
            </button>
          </div>
          {/* Steam cup deco */}
          <div className="hero-rise-4" style={{ marginTop:48,position:"relative",display:"flex",justifyContent:"center" }}>
            <div style={{ position:"relative",width:96,height:96 }}>
              <div className="steam-1" style={{ position:"absolute",left:24,bottom:"100%",width:6,height:32,borderRadius:99,background:"linear-gradient(to top,rgba(255,220,180,0.4),transparent)" }} />
              <div className="steam-2" style={{ position:"absolute",left:40,bottom:"100%",width:4,height:24,borderRadius:99,background:"linear-gradient(to top,rgba(255,220,180,0.3),transparent)" }} />
              <div className="steam-3" style={{ position:"absolute",left:56,bottom:"100%",width:6,height:28,borderRadius:99,background:"linear-gradient(to top,rgba(255,220,180,0.35),transparent)" }} />
              <div style={{ width:96,height:64,borderRadius:"0 0 24px 24px",overflow:"hidden",background:"linear-gradient(135deg,#f5ede4,#e0d0bc)",border:"3px solid #c8b8a4" }}>
                <div style={{ height:"100%",background:"linear-gradient(180deg,#2a0e04,#5a2a0a)" }} />
              </div>
              <div style={{ width:112,height:12,borderRadius:99,marginLeft:-8,marginTop:2,background:"linear-gradient(90deg,#c0b0a0,#d8c8b4,#c0b0a0)" }} />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED BREWS */}
      <section className="slant-top" style={{ background:"#FFFDD0",paddingBottom:80,position:"relative" }}>
        <div style={{ position:"absolute",inset:0,opacity:0.03,backgroundImage:"radial-gradient(#8B4513 1.5px,transparent 1.5px)",backgroundSize:"24px 24px" }} />
        <div style={{ position:"relative",zIndex:10,maxWidth:1280,margin:"0 auto",padding:"0 24px" }}>
          <div style={{ textAlign:"center",marginBottom:48 }}>
            <p className="fira" style={{ fontSize:11,letterSpacing:"0.5em",color:"#78716c",marginBottom:12 }}>// OUR CREATIONS</p>
            <h2 className="playfair" style={{ fontWeight:900,fontSize:"clamp(32px,4vw,48px)",color:"#2D1B13" }}>Featured Brews</h2>
            <div style={{ width:96,height:1.5,margin:"24px auto 0",opacity:0.3,background:"#2D1B13" }} />
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:24,marginBottom:48 }}>
            {brews.map((item,i)=>(
              <div key={i} className="card" style={{ background:"white",borderRadius:24,overflow:"hidden",boxShadow:"0 8px 40px rgba(45,27,19,0.12)",cursor:"pointer" }}>
                <item.V/>
                <div style={{ padding:24 }}>
                  <p className="fira" style={{ fontSize:10,letterSpacing:"0.3em",marginBottom:8,color:item.accent,opacity:0.8 }}>{item.tag}</p>
                  <h3 className="playfair" style={{ fontWeight:900,fontSize:20,color:"#2D1B13",marginBottom:8 }}>{item.title}</h3>
                  <p className="fira" style={{ fontSize:11,color:"#78716c",lineHeight:1.7,marginBottom:20 }}>{item.desc}</p>
                  <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between" }}>
                    <span className="playfair" style={{ fontWeight:900,fontSize:24,color:"#2D1B13" }}>{item.price}</span>
                    <button onClick={()=>{navigate("Menu");window.scrollTo(0,0);}}
                      style={{ background:"#2D1B13",color:"#FFFDD0",border:"none",borderRadius:999,padding:"8px 20px",fontFamily:"'Fira Code',monospace",fontSize:11,fontWeight:600,transition:"all 0.3s" }}>
                      Order →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign:"center" }}>
            <button onClick={()=>{navigate("Menu");window.scrollTo(0,0);}} className="btn-green playfair"
              style={{ fontWeight:900,fontSize:17,padding:"16px 48px",borderRadius:999,border:"none",transition:"all 0.3s" }}>
              View Full Menu
            </button>
          </div>
        </div>
      </section>

      {/* DAILY DEAL */}
      <section style={{ position:"relative",padding:"96px 24px",overflow:"hidden",background:"#1a0d06" }}>
        <div style={{ position:"absolute",inset:0,overflow:"hidden",opacity:0.2,pointerEvents:"none" }}>
          {Array.from({length:50},(_,i)=>(
            <div key={i} style={{ position:"absolute",left:`${(i*17)%100}%`,top:`${(i*13)%100}%`,width:18,height:11,borderRadius:"50%",background:`hsl(22,65%,${18+(i%5)*5}%)`,transform:`rotate(${(i*63)%360}deg)` }} />
          ))}
          <div style={{ position:"absolute",inset:0,background:"radial-gradient(ellipse at 50% 50%,transparent 30%,#1a0d06 80%)" }} />
        </div>
        <div style={{ position:"relative",zIndex:10,maxWidth:1280,margin:"0 auto" }}>
          <div style={{ textAlign:"center",marginBottom:56 }}>
            <p className="fira" style={{ fontSize:11,letterSpacing:"0.5em",color:"#00FF41",marginBottom:12 }}>// TODAY ONLY</p>
            <h2 className="playfair" style={{ fontWeight:900,fontSize:"clamp(32px,4vw,48px)",color:"white" }}>
              Byte Brew <span style={{ fontStyle:"italic",color:"#c8902a" }}>Daily Deal</span>
            </h2>
          </div>
          <div style={{ maxWidth:720,margin:"0 auto",borderRadius:28,overflow:"hidden",background:"linear-gradient(135deg,#f5ede4,#e8d5bc)",position:"relative" }}>
            <div style={{ padding:"40px 48px",display:"flex",flexWrap:"wrap",alignItems:"center",gap:32 }}>
              <div style={{ textAlign:"center",fontSize:64,lineHeight:1 }}>🥐<br/>☕</div>
              <div style={{ flex:1,minWidth:200 }}>
                <div style={{ display:"inline-flex",alignItems:"center",gap:8,fontFamily:"'Fira Code',monospace",fontSize:11,padding:"6px 14px",borderRadius:999,background:"#2D1B13",color:"#00FF41",marginBottom:16 }}>
                  <div style={{ width:6,height:6,borderRadius:"50%",background:"#00FF41",animation:"pulse-glow 2s infinite" }} />
                  DAILY DEAL · LIVE NOW
                </div>
                <h3 className="playfair" style={{ fontWeight:900,fontSize:28,color:"#2D1B13",marginBottom:12 }}>Croissant & House Espresso</h3>
                <p className="fira" style={{ fontSize:11,color:"#78716c",lineHeight:1.8,marginBottom:20 }}>
                  Butter-laminated croissant baked at 6AM, paired with a double shot of our house blend. The perfect boot sequence.
                </p>
                <div style={{ display:"flex",alignItems:"center",gap:16,marginBottom:24 }}>
                  <span className="playfair" style={{ fontWeight:900,fontSize:40,color:"#2D1B13" }}>$6.90</span>
                  <div>
                    <div className="fira" style={{ fontSize:13,textDecoration:"line-through",color:"#a8a29e" }}>$11.50</div>
                    <div className="fira" style={{ fontSize:11,fontWeight:700,color:"#c8902a" }}>Save 40%</div>
                  </div>
                </div>
                <button onClick={()=>{navigate("Menu");window.scrollTo(0,0);}} className="btn-green playfair"
                  style={{ fontWeight:900,fontSize:16,padding:"14px 40px",borderRadius:999,border:"none",transition:"all 0.3s" }}>
                  Order Now →
                </button>
              </div>
            </div>
            <div style={{ position:"absolute",top:20,right:20,width:64,height:64,borderRadius:"50%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"#c8902a",color:"white",fontFamily:"'Fira Code',monospace" }}>
              <span style={{ fontSize:10,fontWeight:700 }}>SAVE</span>
              <span style={{ fontSize:18,fontWeight:900 }}>40%</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PageHome;
