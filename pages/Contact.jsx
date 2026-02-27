import { useState } from "react";

function PageContact() {
  const [form, setForm] = useState({ name:"",email:"",subject:"",message:"" });
  const [sent, setSent] = useState(false);
  const info = [
    { icon:"📍", label:"Address", value:"42 Silicon Alley, Byte District\nSan Francisco, CA 94105" },
    { icon:"✉️", label:"Email", value:"hello@bytebrew.io" },
    { icon:"📞", label:"Phone", value:"+1 (415) 000-BREW" },
    { icon:"🕐", label:"Hours", value:"Mon–Fri: 07:00–19:00\nSat–Sun: 08:00–17:00" },
  ];
  return (
    <div className="page-fade" style={{ minHeight:"100vh",background:"#FFFDD0" }}>
      <div style={{ padding:"128px 24px 64px",background:"linear-gradient(160deg,#0a0f0a,#1a1208,#2d1b13)",textAlign:"center" }}>
        <p className="fira" style={{ fontSize:11,letterSpacing:"0.5em",color:"#00FF41",marginBottom:16 }}>// REACH OUT</p>
        <h1 className="playfair" style={{ fontWeight:900,fontStyle:"italic",fontSize:"clamp(40px,6vw,64px)",color:"white",marginBottom:12,lineHeight:1.1 }}>
          Contact<br/><span style={{ color:"#c8902a" }}>ByteBrew</span>
        </h1>
        <p className="fira" style={{ fontSize:12,color:"#9ca3af",maxWidth:380,margin:"0 auto",lineHeight:1.8 }}>
          Wholesale, press, or just want to talk espresso — we're listening.
        </p>
      </div>
      <div style={{ maxWidth:1100,margin:"0 auto",padding:"64px 24px 80px",display:"grid",gridTemplateColumns:"2fr 3fr",gap:40 }} className="contact-grid">
        <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
          <div>
            <p className="fira" style={{ fontSize:10,letterSpacing:"0.4em",color:"#78716c",marginBottom:12 }}>// FIND US</p>
            <h2 className="playfair" style={{ fontWeight:900,fontSize:32,color:"#2D1B13",marginBottom:8 }}>Get in Touch</h2>
            <p className="fira" style={{ fontSize:11,color:"#78716c",lineHeight:1.8 }}>We respond within one business day.</p>
          </div>
          {info.map((item,i)=>(
            <div key={i} style={{ display:"flex",gap:16,padding:20,background:"white",borderRadius:16,boxShadow:"0 4px 20px rgba(45,27,19,0.08)" }}>
              <span style={{ fontSize:24,flexShrink:0 }}>{item.icon}</span>
              <div>
                <p className="fira" style={{ fontSize:9,fontWeight:700,color:"#78716c",letterSpacing:"0.3em",marginBottom:4 }}>{item.label.toUpperCase()}</p>
                <p className="playfair" style={{ fontWeight:700,color:"#2D1B13",fontSize:13,whiteSpace:"pre-line" }}>{item.value}</p>
              </div>
            </div>
          ))}
          <div style={{ padding:20,borderRadius:16,background:"linear-gradient(135deg,#2d1b13,#4a2c1a)" }}>
            <p className="fira" style={{ fontSize:10,fontWeight:700,color:"#00FF41",letterSpacing:"0.3em",marginBottom:16 }}>SOCIALS</p>
            <div style={{ display:"flex",gap:12 }}>
              {[["𝕏","@ByteBrewCafe"],["ig","@bytebrew"],["Li","ByteBrew Inc"]].map(([s,h])=>(
                <div key={s} style={{ flex:1,textAlign:"center" }}>
                  <div className="fira" style={{ fontSize:14,fontWeight:700,color:"white" }}>{s}</div>
                  <div className="fira" style={{ fontSize:9,color:"#6b5e55",marginTop:4 }}>{h}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ background:"white",borderRadius:28,overflow:"hidden",boxShadow:"0 8px 40px rgba(45,27,19,0.12)" }}>
          {sent ? (
            <div style={{ display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:60,textAlign:"center",height:"100%" }}>
              <div style={{ fontSize:64,marginBottom:24 }}>✅</div>
              <h3 className="playfair" style={{ fontWeight:900,fontSize:28,color:"#2D1B13",marginBottom:12 }}>Message Sent!</h3>
              <p className="fira" style={{ fontSize:12,color:"#78716c",lineHeight:1.8 }}>Compiled and dispatched.<br/>We'll respond within 24 hours.</p>
              <button onClick={()=>setSent(false)} style={{ marginTop:20,background:"#2D1B13",color:"#FFFDD0",border:"none",borderRadius:999,padding:"10px 24px",fontFamily:"'Fira Code',monospace",fontSize:11 }}>
                Send Another
              </button>
            </div>
          ) : (
            <div style={{ padding:40 }}>
              <p className="fira" style={{ fontSize:10,letterSpacing:"0.4em",color:"#78716c",marginBottom:8 }}>// NEW MESSAGE</p>
              <h3 className="playfair" style={{ fontWeight:900,fontSize:24,color:"#2D1B13",marginBottom:32 }}>Send us a message</h3>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:20 }}>
                {[["name","Your Name","Ada Lovelace"],["email","Email","ada@coffee.dev"]].map(([k,l,pl])=>(
                  <div key={k}>
                    <label className="fira" style={{ fontSize:9,fontWeight:700,color:"#78716c",letterSpacing:"0.3em",display:"block",marginBottom:8 }}>{l.toUpperCase()}</label>
                    <input value={form[k]} onChange={e=>setForm(p=>({...p,[k]:e.target.value}))} placeholder={pl}
                      style={{ width:"100%",padding:"12px 16px",borderRadius:12,outline:"none",fontSize:12,background:"#f8f5ef",border:"1.5px solid #e8e0d4",color:"#2D1B13",transition:"border 0.2s" }}
                      onFocus={e=>e.target.style.borderColor="#00FF41"} onBlur={e=>e.target.style.borderColor="#e8e0d4"} />
                  </div>
                ))}
              </div>
              <div style={{ marginBottom:20 }}>
                <label className="fira" style={{ fontSize:9,fontWeight:700,color:"#78716c",letterSpacing:"0.3em",display:"block",marginBottom:8 }}>SUBJECT</label>
                <select value={form.subject} onChange={e=>setForm(p=>({...p,subject:e.target.value}))}
                  style={{ width:"100%",padding:"12px 16px",borderRadius:12,outline:"none",fontSize:12,background:"#f8f5ef",border:"1.5px solid #e8e0d4",color:form.subject?"#2D1B13":"#9ca3af",appearance:"none" }}>
                  <option value="">Select a topic...</option>
                  {["General Inquiry","Wholesale Orders","Press & Media","Catering","Feedback","Careers"].map(o=>(
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom:32 }}>
                <label className="fira" style={{ fontSize:9,fontWeight:700,color:"#78716c",letterSpacing:"0.3em",display:"block",marginBottom:8 }}>MESSAGE</label>
                <textarea value={form.message} onChange={e=>setForm(p=>({...p,message:e.target.value}))}
                  placeholder="Tell us what's on your mind..." rows={5}
                  style={{ width:"100%",padding:"12px 16px",borderRadius:12,outline:"none",fontSize:12,background:"#f8f5ef",border:"1.5px solid #e8e0d4",color:"#2D1B13",resize:"none",transition:"border 0.2s" }}
                  onFocus={e=>e.target.style.borderColor="#00FF41"} onBlur={e=>e.target.style.borderColor="#e8e0d4"} />
              </div>
              <button onClick={()=>{ if(form.name&&form.email&&form.message) setSent(true); }}
                disabled={!form.name||!form.email||!form.message}
                className="btn-green playfair"
                style={{ width:"100%",fontWeight:900,fontSize:16,padding:"16px",borderRadius:14,border:"none",transition:"all 0.3s",opacity:(!form.name||!form.email||!form.message)?0.4:1 }}>
                Send Message →
              </button>
            </div>
          )}
        </div>
      </div>
      <style>{`@media(max-width:768px){.contact-grid{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}

export default PageContact;
