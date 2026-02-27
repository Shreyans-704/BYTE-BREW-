import { useState } from "react";

function PageCommunity({ navigate }) {
  const [liked, setLiked] = useState({});
  const posts = [
    { user:"dev_espresso", handle:"@dev_espresso", avatar:"👩‍💻", time:"2h ago", text:"My ByteBrew morning ritual: pull shot → check metrics → deploy. In that order. Non-negotiable.", likes:142, tag:"#ByteBrewMorning" },
    { user:"cloud_barista", handle:"@cloud_barista", avatar:"☁️", time:"4h ago", text:"The Open Source Beans subscription changed my WFH setup. 250g of Ethiopian Guji every 2 weeks. My standups have never been more productive.", likes:89, tag:"#OpenSourceBeans" },
    { user:"kernelpanic99", handle:"@kernelpanic99", avatar:"🧑‍🔬", time:"5h ago", text:"Asked my ByteBrew barista to explain the extraction process. Got a 10-minute lecture on fluid dynamics. These are my people.", likes:203, tag:"#ByteBrewCulture" },
    { user:"sofia_codes", handle:"@sofia_codes", avatar:"👩‍🎨", time:"7h ago", text:"Nitro cold brew + a deadline = 6,000 lines of clean code. Correlation is not causation but I'm not testing the null hypothesis.", likes:317, tag:"#CloudFoamLatte" },
    { user:"m_webb_brews", handle:"@m_webb_brews", avatar:"🚀", time:"1d ago", text:"Fun fact: the Raspberry Pi still running our queue system has better uptime than any EC2 instance I ever managed. Coffee > Cloud.", likes:558, tag:"#ByteBrewFact" },
    { user:"aria_roasts", handle:"@aria_roasts", avatar:"🔥", time:"1d ago", text:"Roast batch #847 complete. Ethiopia Guji natural. Blueberry + jasmine. Agtron 72. Dropping in the shop Thursday.", likes:421, tag:"#OpenSourceBeans" },
  ];
  const events = [
    { date:"FEB 28", title:"Brew & Code Night", desc:"Monthly coding session. ByteBrew fueled. Collab welcome.", spots:"8 spots left", icon:"💻" },
    { date:"MAR 08", title:"Origin Story: Ethiopia", desc:"Deep dive on Guji natural processing. Live Q&A with farm partner.", spots:"12 spots left", icon:"🌍" },
    { date:"MAR 15", title:"Latte Art Masterclass", desc:"Learn the ByteBrew pour with Aria. Max 6 attendees.", spots:"3 spots left", icon:"☕" },
  ];
  return (
    <div className="page-fade" style={{ minHeight:"100vh",background:"#0f0a06" }}>
      <div style={{ padding:"128px 24px 64px",background:"linear-gradient(160deg,#0a0f0a,#1a1208,#2d1b13)",textAlign:"center" }}>
        <p className="fira" style={{ fontSize:11,letterSpacing:"0.5em",color:"#00FF41",marginBottom:16 }}>// THE HUB</p>
        <h1 className="playfair" style={{ fontWeight:900,fontStyle:"italic",fontSize:"clamp(40px,6vw,64px)",color:"white",marginBottom:12,lineHeight:1.1 }}>
          ByteBrew<br/><span style={{ color:"#c8902a" }}>Community</span>
        </h1>
        <p className="fira" style={{ fontSize:12,color:"#9ca3af",maxWidth:440,margin:"0 auto",lineHeight:1.8 }}>
          Developers, designers, and coffee obsessives united by one thing.
        </p>
        <div style={{ display:"flex",flexWrap:"wrap",gap:10,justifyContent:"center",marginTop:24 }}>
          {["#ByteBrewMorning","#OpenSourceBeans","#CloudFoamLatte","#ByteBrewCulture"].map(tag=>(
            <span key={tag} className="fira" style={{ fontSize:11,padding:"8px 16px",borderRadius:999,background:"rgba(0,255,65,0.1)",color:"#00FF41",border:"1px solid rgba(0,255,65,0.2)" }}>{tag}</span>
          ))}
        </div>
      </div>
      <div style={{ maxWidth:1280,margin:"0 auto",padding:"48px 24px 80px",display:"grid",gridTemplateColumns:"1fr min(340px,100%)",gap:32 }} className="community-grid">
        <div>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:28 }}>
            <div>
              <p className="fira" style={{ fontSize:10,letterSpacing:"0.4em",color:"#00FF41",marginBottom:6 }}>// FEED</p>
              <h2 className="playfair" style={{ fontWeight:900,fontSize:24,color:"white" }}>Community Posts</h2>
            </div>
            <span className="fira" style={{ fontSize:11,color:"#3d2d24" }}>Live · {posts.length} today</span>
          </div>
          <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
            {posts.map((p,i)=>(
              <div key={i} style={{ background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:20,padding:24,transition:"background 0.2s" }}
                onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.06)"}
                onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.04)"}>
                <div style={{ display:"flex",gap:16,alignItems:"flex-start" }}>
                  <div style={{ width:40,height:40,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,background:"rgba(45,27,19,0.8)",flexShrink:0 }}>{p.avatar}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex",gap:8,alignItems:"center",marginBottom:8,flexWrap:"wrap" }}>
                      <span className="fira" style={{ fontSize:11,fontWeight:700,color:"white" }}>{p.user}</span>
                      <span className="fira" style={{ fontSize:11,color:"#6b5e55" }}>{p.handle}</span>
                      <span className="fira" style={{ fontSize:11,color:"#3d2d24",marginLeft:"auto" }}>{p.time}</span>
                    </div>
                    <p className="fira" style={{ fontSize:12,color:"#d6d3d1",lineHeight:1.7,marginBottom:12 }}>{p.text}</p>
                    <div style={{ display:"flex",gap:16,alignItems:"center" }}>
                      <span className="fira" style={{ fontSize:10,color:"#00AA22" }}>{p.tag}</span>
                      <button onClick={()=>setLiked(prev=>({...prev,[i]:!prev[i]}))}
                        style={{ background:"none",border:"none",fontFamily:"'Fira Code',monospace",fontSize:11,color:liked[i]?"#ff6b6b":"#4a3a30",transition:"color 0.2s" }}>
                        {liked[i]?"♥":"♡"} {p.likes+(liked[i]?1:0)}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display:"flex",flexDirection:"column",gap:20 }}>
          <div style={{ background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:24,overflow:"hidden" }}>
            <div style={{ padding:"20px 24px",borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
              <p className="fira" style={{ fontSize:10,letterSpacing:"0.4em",color:"#00FF41",marginBottom:6 }}>// UPCOMING</p>
              <h3 className="playfair" style={{ fontWeight:900,fontSize:20,color:"white" }}>Events</h3>
            </div>
            {events.map((e,i)=>(
              <div key={i} style={{ padding:"16px 24px",borderBottom:"1px solid rgba(255,255,255,0.05)",display:"flex",gap:16,cursor:"pointer",transition:"background 0.2s" }}
                onMouseEnter={ev=>ev.currentTarget.style.background="rgba(255,255,255,0.04)"}
                onMouseLeave={ev=>ev.currentTarget.style.background="transparent"}>
                <div style={{ textAlign:"center",flexShrink:0 }}>
                  <div className="fira" style={{ fontSize:10,fontWeight:700,color:"#c8902a" }}>{e.date}</div>
                  <div style={{ fontSize:22,marginTop:4 }}>{e.icon}</div>
                </div>
                <div>
                  <h4 className="playfair" style={{ fontWeight:700,fontSize:14,color:"white",marginBottom:4 }}>{e.title}</h4>
                  <p className="fira" style={{ fontSize:10,color:"#6b5e55",lineHeight:1.6,marginBottom:8 }}>{e.desc}</p>
                  <span className="fira" style={{ fontSize:9,padding:"3px 8px",borderRadius:99,background:e.spots.includes("3")?"rgba(255,100,100,0.15)":"rgba(0,255,65,0.1)",color:e.spots.includes("3")?"#ff8080":"#00FF41" }}>{e.spots}</span>
                </div>
              </div>
            ))}
            <div style={{ padding:20 }}>
              <button className="btn-green fira" style={{ width:"100%",padding:"12px",border:"none",borderRadius:12,fontSize:11,fontWeight:700,transition:"all 0.3s" }}>
                Browse All Events →
              </button>
            </div>
          </div>
          <div style={{ background:"linear-gradient(135deg,#1a0d06,#2d1b13)",border:"1px solid rgba(0,255,65,0.15)",borderRadius:24,padding:24 }}>
            <p className="fira" style={{ fontSize:10,letterSpacing:"0.3em",color:"#00FF41",marginBottom:12 }}>// JOIN US</p>
            <h3 className="playfair" style={{ fontWeight:900,fontSize:18,color:"white",marginBottom:12 }}>Share your brew story</h3>
            <p className="fira" style={{ fontSize:11,color:"#6b5e55",lineHeight:1.7,marginBottom:20 }}>
              Post with #ByteBrewMorning and get featured in our weekly community digest.
            </p>
            <button onClick={()=>{navigate("Contact");window.scrollTo(0,0);}} className="btn-green fira"
              style={{ width:"100%",padding:"12px",border:"none",borderRadius:12,fontSize:11,fontWeight:700,transition:"all 0.3s" }}>
              Get in Touch →
            </button>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){.community-grid{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}

export default PageCommunity;
