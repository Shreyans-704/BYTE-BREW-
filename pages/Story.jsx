function PageStory({ navigate }) {
  const timeline = [
    { year:"2022", title:"The Breakdown", desc:"Marcus Webb spends his 14th hour debugging Kubernetes. His espresso machine outperforms every server. A thought forms.", icon:"💻" },
    { year:"2023", title:"The Experiment", desc:"Marcus meets Aria Chen — Google SRE by day, home roaster by night. 6 months. A garage. Every variable logged like an A/B test.", icon:"🧪" },
    { year:"Early 2024", title:"The Design Sprint", desc:"Sofia Reyes sketches the ByteBrew identity on a coffee-stained napkin mid-meeting. She quits the next day. The napkin becomes the brand.", icon:"✏️" },
    { year:"April 2024", title:"First Commit", desc:"ByteBrew opens. One machine. Three people. 42 cups on day one. #ByteBrewMorning is coined by a customer who pays with crypto.", icon:"🚀" },
    { year:"2025", title:"Scaling the Stack", desc:"12 team members. 42 farm partners. A waitlist for the bean subscription. The Raspberry Pi still runs the queue.", icon:"📈" },
    { year:"Now", title:"Still Brewing", desc:"Every morning, the team pulls a shot before anything else. Not ritual — calibration. Precision never sleeps.", icon:"☕" },
  ];
  return (
    <div className="page-fade" style={{ minHeight:"100vh",background:"#0a0f0a" }}>
      <div style={{ padding:"128px 24px 80px",textAlign:"center",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",inset:0,opacity:0.03,backgroundImage:"radial-gradient(#00FF41 1px,transparent 1px)",backgroundSize:"28px 28px" }} />
        <div style={{ position:"relative",zIndex:10,maxWidth:720,margin:"0 auto" }}>
          <p className="fira" style={{ fontSize:11,letterSpacing:"0.5em",color:"#00FF41",marginBottom:16 }}>// ORIGIN STORY</p>
          <h1 className="playfair" style={{ fontWeight:900,fontStyle:"italic",fontSize:"clamp(40px,6vw,72px)",color:"white",marginBottom:20,lineHeight:1.1 }}>
            How ByteBrew<br/><span style={{ color:"#c8902a" }}>Got Compiled</span>
          </h1>
          <p className="fira" style={{ fontSize:13,color:"#9ca3af",lineHeight:1.8 }}>
            A story about burnout, obsession, bad Kubernetes clusters, and the perfect espresso that changed everything.
          </p>
        </div>
      </div>
      <div style={{ maxWidth:800,margin:"0 auto",padding:"0 24px 32px" }}>
        <blockquote style={{ borderLeft:"4px solid #00FF41",paddingLeft:32,marginBottom:64 }}>
          <p className="playfair" style={{ fontWeight:900,fontStyle:"italic",fontSize:"clamp(20px,2.5vw,28px)",color:"white",lineHeight:1.5,marginBottom:16 }}>
            "The espresso machine never had a single outage. I can't say the same for anything I ever deployed."
          </p>
          <footer className="fira" style={{ fontSize:11,color:"#6b5e55" }}>— Marcus Webb, Founder & CEO</footer>
        </blockquote>
        <div style={{ textAlign:"center",marginBottom:64 }}>
          <p className="fira" style={{ fontSize:11,letterSpacing:"0.4em",color:"#00FF41",marginBottom:12 }}>// COMMIT HISTORY</p>
          <h2 className="playfair" style={{ fontWeight:900,fontSize:36,color:"white" }}>The Timeline</h2>
        </div>
        <div style={{ position:"relative" }}>
          <div style={{ position:"absolute",left:20,top:0,bottom:0,width:1,background:"rgba(0,255,65,0.2)" }} />
          <div style={{ display:"flex",flexDirection:"column",gap:40 }}>
            {timeline.map((e,i)=>(
              <div key={i} style={{ position:"relative",paddingLeft:56 }}>
                <div style={{ position:"absolute",left:12,top:4,width:16,height:16,borderRadius:"50%",background:"#00FF41",boxShadow:"0 0 12px rgba(0,255,65,0.6)" }} />
                <div style={{ background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:20,padding:24 }}>
                  <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:12 }}>
                    <span style={{ fontSize:24 }}>{e.icon}</span>
                    <span className="fira" style={{ fontSize:11,fontWeight:700,letterSpacing:"0.2em",color:"#c8902a" }}>{e.year}</span>
                  </div>
                  <h3 className="playfair" style={{ fontWeight:900,fontSize:20,color:"white",marginBottom:8 }}>{e.title}</h3>
                  <p className="fira" style={{ fontSize:11,color:"#9ca3af",lineHeight:1.8 }}>{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ textAlign:"center",padding:"64px 24px",background:"rgba(255,255,255,0.02)" }}>
        <p className="fira" style={{ fontSize:11,letterSpacing:"0.4em",color:"#00FF41",marginBottom:16 }}>// BECOME PART OF IT</p>
        <h2 className="playfair" style={{ fontWeight:900,fontSize:28,color:"white",marginBottom:24 }}>The story is still being written.</h2>
        <div style={{ display:"flex",flexWrap:"wrap",gap:16,justifyContent:"center" }}>
          <button onClick={()=>{navigate("Menu");window.scrollTo(0,0);}} className="btn-green playfair" style={{ fontWeight:900,fontSize:16,padding:"14px 40px",borderRadius:999,border:"none",transition:"all 0.3s" }}>
            Order Your Chapter →
          </button>
          <button onClick={()=>{navigate("Community");window.scrollTo(0,0);}} className="playfair"
            style={{ fontWeight:900,fontSize:16,padding:"14px 40px",borderRadius:999,border:"1px solid #57534e",color:"#d6d3d1",background:"none",transition:"all 0.3s" }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor="#00FF41";e.currentTarget.style.color="#00FF41";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="#57534e";e.currentTarget.style.color="#d6d3d1";}}>
            Join Community
          </button>
        </div>
      </div>
    </div>
  );
}

export default PageStory;
