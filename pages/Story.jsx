function PageStory({ navigate }) {
  const timeline = [
    { year:"2021", title:"The 2 AM Breakdown", desc:"Arjun Sharma, a senior engineer at a Bengaluru unicorn, spends his 13th hour on an on-call incident. He makes a cup of filter coffee from a steel dabara-tumbler set his mother sent from Coorg. It is the best thing he has tasted all year. Something shifts.", icon:"💻" },
    { year:"2022", title:"The Coorg Connection", desc:"Arjun drives to a small estate in Madikeri, Coorg — owned by Priya Nair's family for three generations. He brings a refractometer and a laptop. She roasts a small batch on a wood-fired pan. They cup it together and realise the terroir of Indian beans has never been taken seriously. That changes today.", icon:"🧪" },
    { year:"Early 2023", title:"The Design Session", desc:"Kavya Reddy, a product designer from Hyderabad who's shipping features for a fintech startup, joins a weekend hackathon at Arjun's flat in Indiranagar. She sketches the ByteBrew wordmark on the back of a Swiggy bag between two filter coffees. She messages her manager the next morning: 'I quit.'", icon:"✏️" },
    { year:"October 2023", title:"First Commit", desc:"ByteBrew opens in a 600 sq. ft. space on 100 Feet Road, Indiranagar. One La Marzocca. A hand-written menu on a chalkboard. 67 cups on day one. A Zomato review calls it 'the most engineering-brained café in India.' They frame it on the wall.", icon:"🚀" },
    { year:"2024", title:"Scaling the Stack", desc:"Three new estate partnerships — Chikmagalur, Wayanad, and the Nilgiris. A bean subscription waitlist of 1,200 people. The original Raspberry Pi still runs the billing queue. Arjun refuses to replace it.", icon:"📈" },
    { year:"Now", title:"Still Brewing", desc:"Every morning at 7 AM, before the first customer walks in, the three founders pull one shot each from the house blend. Not for nostalgia — for calibration. The pursuit of a perfect cup, compiled one day at a time.", icon:"☕" },
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
            A story about burnout, Coorg estates, late-night filter coffee, and three people who believed<br/>Indian beans deserved world-class engineering.
          </p>
        </div>
      </div>
      <div style={{ maxWidth:800,margin:"0 auto",padding:"0 24px 32px" }}>
        <blockquote style={{ borderLeft:"4px solid #00FF41",paddingLeft:32,marginBottom:64 }}>
          <p className="playfair" style={{ fontWeight:900,fontStyle:"italic",fontSize:"clamp(20px,2.5vw,28px)",color:"white",lineHeight:1.5,marginBottom:16 }}>
            "My amma's filter coffee never crashed. Not once. I can't say the same for any system I ever deployed on-call."
          </p>
          <footer className="fira" style={{ fontSize:11,color:"#6b5e55" }}>— Arjun Sharma, Founder & CEO</footer>
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
