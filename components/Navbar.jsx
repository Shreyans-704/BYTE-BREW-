import { useState, useEffect } from "react";

const NAV_LINKS = ["Home","About","Menu","Story","Community","Contact"];

function Navbar({ page, navigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const go = (p) => { navigate(p); setOpen(false); window.scrollTo(0,0); };

  return (
    <nav style={{
      position:"fixed", top:0, left:0, right:0, zIndex:50,
      background: scrolled ? "rgba(26,13,6,0.96)" : "rgba(26,13,6,0.88)",
      backdropFilter:"blur(12px)",
      boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.5)" : "none",
      borderBottom: "1px solid rgba(0,255,65,0.08)",
      transition:"all 0.4s",
    }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"12px 24px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:16 }}>
        {/* Logo */}
        <button onClick={() => go("Home")} style={{ display:"flex", alignItems:"center", gap:10, background:"none", border:"none" }}>
          <img src="/logo.png" alt="ByteBrew Logo" style={{
            width:36, height:36, borderRadius:10, objectFit:"cover",
            border:"1.5px solid rgba(0,255,65,0.55)", animation:"pulse-glow 3s ease infinite",
          }} />
          <span className="playfair" style={{ fontWeight:900, fontSize:20, color:"white" }}>
            Byte<span style={{ color:"#00FF41" }}>Brew</span>
          </span>
        </button>

        {/* Desktop links */}
        <div style={{ display:"flex", gap:28, alignItems:"center" }} className="hide-mobile">
          {NAV_LINKS.map(l => (
            <button key={l} onClick={() => go(l)}
              className={`nav-link fira ${page === l ? "active" : ""}`}
              style={{ background:"none", border:"none", fontSize:12, color: page===l ? "#00FF41" : "#d4c4b8", transition:"color 0.2s", padding:"4px 0" }}>
              {l}
            </button>
          ))}
        </div>

        {/* Right */}
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <button onClick={() => go("Menu")}
            className="btn-green fira hide-mobile"
            style={{ fontSize:12, fontWeight:700, padding:"10px 22px", borderRadius:999, border:"none", transition:"all 0.3s" }}>
            Order Now
          </button>
          <button onClick={() => setOpen(!open)} className="show-mobile"
            style={{ background:"none", border:"none", color:"white", padding:4 }}>
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {open ? <path d="M18 6 6 18M6 6l12 12"/> : <path d="M3 6h18M3 12h18M3 18h18"/>}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div style={{ background:"#1a0d06", borderTop:"1px solid rgba(255,255,255,0.06)", padding:"8px 24px 16px" }}>
          {NAV_LINKS.map(l => (
            <button key={l} onClick={() => go(l)}
              style={{ display:"block", width:"100%", textAlign:"left", background:"none", border:"none",
                padding:"12px 0", fontFamily:"'Fira Code',monospace", fontSize:13,
                color: page===l ? "#00FF41" : "#9ca3af", borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
              &gt;&nbsp;{l}
            </button>
          ))}
          <button onClick={() => go("Menu")}
            className="btn-green fira"
            style={{ marginTop:12, width:"100%", fontSize:13, fontWeight:700, padding:"12px", borderRadius:12, border:"none", transition:"all 0.3s" }}>
            Order Now
          </button>
        </div>
      )}
      <style>{`
        @media(max-width:768px){.hide-mobile{display:none!important}}
        @media(min-width:769px){.show-mobile{display:none!important}}
      `}</style>
    </nav>
  );
}

export default Navbar;
