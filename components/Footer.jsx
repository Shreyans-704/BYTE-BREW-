function Footer({ navigate }) {
  const cols = [
    { heading:"Byte Brew Shop", links:["Espresso Blends","Iced Cold Brews","Seasonal Specials","Merch & Gear","Gift Cards"] },
    { heading:"Our Beans", links:["Origin Stories","Farm Partners","Roast Profiles","Brew Guides","Sustainability"] },
    { heading:"Contact", links:["hello@bytebrew.io","@ByteBrewCafe","Visit Us","Press Kit","Wholesale"] },
    { heading:"Community Info", links:["About Us","Our Story","Events","Newsletter","Careers"] },
  ];
  return (
    <footer style={{ background: "#1A0F0A", borderTop: "1px solid rgba(0,255,65,0.1)", position: "relative", zIndex: 0 }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"64px 24px 0" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:40, marginBottom:48 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
              <div style={{ width:32, height:32, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center",
                background:"linear-gradient(135deg,#5C3317,#2D1B13)", border:"1px solid rgba(0,255,65,0.4)" }}>
                <img src="/logo.png" alt="ByteBrew Logo" style={{ width:"100%", height:"100%", borderRadius:8, objectFit:"cover" }} />
              </div>
              <span className="playfair" style={{ fontWeight:900, fontSize:18, color:"white" }}>
                Byte<span style={{ color:"#00FF41" }}>Brew</span>
              </span>
            </div>
            <p className="fira" style={{ fontSize:11, color:"#6b5e55", lineHeight:1.8, marginBottom:20 }}>
              Artisan coffee for the digital age. Every cup is a perfectly compiled expression of craft and code.
            </p>
            <div style={{ display:"flex", gap:8 }}>
              {["𝕏","ig","Li","yt"].map(s => (
                <button key={s} className="fira"
                  style={{ width:32, height:32, borderRadius:"50%", border:"1px solid #3d2d24", color:"#5a4a40",
                    background:"none", fontSize:12, transition:"all 0.2s" }}
                  onMouseEnter={e => { e.target.style.borderColor="#00FF41"; e.target.style.color="#00FF41"; }}
                  onMouseLeave={e => { e.target.style.borderColor="#3d2d24"; e.target.style.color="#5a4a40"; }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          {cols.map(col => (
            <div key={col.heading}>
              <h4 className="fira" style={{ fontSize:10, fontWeight:600, letterSpacing:"0.25em", color:"#00FF41", marginBottom:20, textTransform:"uppercase" }}>
                {col.heading}
              </h4>
              <ul style={{ listStyle:"none" }}>
                {col.links.map(link => (
                  <li key={link} style={{ marginBottom:10 }}>
                    <button onClick={() => { navigate(col.heading.includes("Community") ? "Community" : col.heading.includes("Contact") ? "Contact" : "Menu"); window.scrollTo(0,0); }}
                      className="fira"
                      style={{ background:"none", border:"none", fontSize:11, color:"#5a4a40", textAlign:"left", transition:"color 0.2s", padding:0 }}
                      onMouseEnter={e => e.target.style.color="#c4b4a8"}
                      onMouseLeave={e => e.target.style.color="#5a4a40"}>
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop:"1px solid #2a1a10", padding:"20px 0 24px", display:"flex", flexWrap:"wrap", gap:12, alignItems:"center", justifyContent:"space-between" }}>
          <p className="fira" style={{ fontSize:11, color:"#3d2d24" }}>© 2024 ByteBrew Inc. · All systems operational · v3.0.1</p>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:8, height:8, borderRadius:"50%", background:"#00FF41", animation:"pulse-glow 2s infinite" }} />
            <span className="fira" style={{ fontSize:11, color:"#3d2d24" }}>Status: <span style={{ color:"#00FF41" }}>All brews go</span></span>
          </div>
          <div style={{ display:"flex", gap:20 }}>
            {["Privacy","Terms","Cookies"].map(t => (
              <button key={t} className="fira"
                style={{ background:"none", border:"none", fontSize:11, color:"#3d2d24", transition:"color 0.2s" }}
                onMouseEnter={e => e.target.style.color="#7a6a60"}
                onMouseLeave={e => e.target.style.color="#3d2d24"}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
