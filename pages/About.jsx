function PageAbout({ navigate }) {
  const team = [
    { name:"Aria Chen", role:"Head Roaster & CTO", emoji:"👩‍💻", bio:"Former Google SRE. Runs espresso machines like distributed systems — no single point of failure." },
    { name:"Marcus Webb", role:"Founder & CEO", emoji:"🧑‍🔬", bio:"Ex-AWS engineer who quit to obsess over extraction ratios. Built ByteBrew on a Raspberry Pi and a dream." },
    { name:"Sofia Reyes", role:"UX Barista & Designer", emoji:"👩‍🎨", bio:"Designs every cup interaction like a user flow. Your coffee experience is her wireframe come to life." },
  ];
  const values = [
    { icon:"⚙️", title:"Precision First", desc:"Every variable — grind, temp, tamp — is logged, iterated, optimized." },
    { icon:"🌿", title:"Source Transparency", desc:"Every bean has a provenance chain: farm, altitude, harvest date." },
    { icon:"🔁", title:"Circular by Default", desc:"98% waste-free. Compostable packaging. Grounds returned to farms." },
    { icon:"💻", title:"Open Knowledge", desc:"All brew recipes open-sourced. Great coffee is a shared protocol." },
  ];
  return (
    <div className="page-fade" style={{ background:"#FFFDD0",minHeight:"100vh" }}>
      <div style={{ padding:"128px 24px 80px",background:"linear-gradient(160deg,#0a0f0a,#1a1208,#2d1b13)",textAlign:"center" }}>
        <p className="fira" style={{ fontSize:11,letterSpacing:"0.5em",color:"#00FF41",marginBottom:16 }}>// OUR STORY</p>
        <h1 className="playfair" style={{ fontWeight:900,fontStyle:"italic",fontSize:"clamp(40px,6vw,72px)",color:"white",lineHeight:1.1,marginBottom:20 }}>
          About<br/><span style={{ color:"#c8902a" }}>ByteBrew</span>
        </h1>
        <p className="fira" style={{ fontSize:13,color:"#9ca3af",maxWidth:480,margin:"0 auto",lineHeight:1.8 }}>
          Born at the intersection of obsessive engineering and artisan craft.
        </p>
      </div>
      <div style={{ maxWidth:1200,margin:"0 auto",padding:"80px 24px" }}>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:48,alignItems:"center",marginBottom:80 }}>
          <div>
            <p className="fira" style={{ fontSize:10,letterSpacing:"0.4em",color:"#78716c",marginBottom:16 }}>// MISSION</p>
            <h2 className="playfair" style={{ fontWeight:900,fontSize:"clamp(28px,3vw,36px)",color:"#2D1B13",marginBottom:20,lineHeight:1.2 }}>
              We treat every cup like a<br/><span style={{ fontStyle:"italic",color:"#c8902a" }}>production deploy.</span>
            </h2>
            <p className="fira" style={{ fontSize:11,color:"#78716c",lineHeight:1.8,marginBottom:16 }}>
              ByteBrew started in 2024 when Marcus Webb, a burned-out AWS engineer, realized his espresso machine had better uptime than most cloud services. He called Aria. She brought the beans. Sofia designed the logo on a napkin.
            </p>
            <button onClick={()=>{navigate("Story");window.scrollTo(0,0);}}
              style={{ background:"#2D1B13",color:"#FFFDD0",border:"none",borderRadius:999,padding:"12px 32px",fontFamily:"'Fira Code',monospace",fontSize:12,fontWeight:600,transition:"all 0.3s" }}>
              Read Full Story →
            </button>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16 }}>
            {[["42","Farm Partners","🌍"],["98%","Waste-Free","♻️"],["12k+","Cups / Week","☕"],["2.4×","Fair Trade Rate","🤝"]].map(([n,l,e])=>(
              <div key={l} style={{ background:"white",borderRadius:20,padding:"24px 16px",textAlign:"center",boxShadow:"0 4px 24px rgba(45,27,19,0.1)" }}>
                <div style={{ fontSize:28,marginBottom:8 }}>{e}</div>
                <div className="playfair" style={{ fontWeight:900,fontSize:28,color:"#2D1B13" }}>{n}</div>
                <div className="fira" style={{ fontSize:10,color:"#78716c",marginTop:4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginBottom:80 }}>
          <div style={{ textAlign:"center",marginBottom:48 }}>
            <p className="fira" style={{ fontSize:10,letterSpacing:"0.4em",color:"#78716c",marginBottom:12 }}>// CORE VALUES</p>
            <h2 className="playfair" style={{ fontWeight:900,fontSize:36,color:"#2D1B13" }}>How We Operate</h2>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:20 }}>
            {values.map((v,i)=>(
              <div key={i} style={{ background:"white",borderRadius:20,padding:24,border:"1px solid rgba(45,27,19,0.08)",transition:"all 0.3s" }}
                onMouseEnter={e=>e.currentTarget.style.boxShadow="0 12px 40px rgba(45,27,19,0.15)"}
                onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
                <div style={{ fontSize:36,marginBottom:16 }}>{v.icon}</div>
                <h3 className="playfair" style={{ fontWeight:700,fontSize:18,color:"#2D1B13",marginBottom:8 }}>{v.title}</h3>
                <p className="fira" style={{ fontSize:11,color:"#78716c",lineHeight:1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ textAlign:"center",marginBottom:48 }}>
          <p className="fira" style={{ fontSize:10,letterSpacing:"0.4em",color:"#78716c",marginBottom:12 }}>// THE TEAM</p>
          <h2 className="playfair" style={{ fontWeight:900,fontSize:36,color:"#2D1B13" }}>Who Brews This</h2>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:24 }}>
          {team.map((m,i)=>(
            <div key={i} className="card" style={{ background:"white",borderRadius:24,overflow:"hidden",boxShadow:"0 8px 40px rgba(45,27,19,0.1)" }}>
              <div style={{ height:160,display:"flex",alignItems:"center",justifyContent:"center",fontSize:80,background:"linear-gradient(135deg,#2d1b13,#4a2c1a)" }}>{m.emoji}</div>
              <div style={{ padding:24 }}>
                <h3 className="playfair" style={{ fontWeight:900,fontSize:20,color:"#2D1B13" }}>{m.name}</h3>
                <p className="fira" style={{ fontSize:10,color:"#00AA22",letterSpacing:"0.2em",margin:"8px 0 12px" }}>{m.role}</p>
                <p className="fira" style={{ fontSize:11,color:"#78716c",lineHeight:1.7 }}>{m.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PageAbout;
