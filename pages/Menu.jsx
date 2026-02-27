import { useState } from "react";
import INR from "../components/INR";

function PageMenu() {
  const cats = ["All","Espresso","Cold Brew","Specialty","Beans","Food"];
  const [active,    setActive]    = useState("All");
  const [cart,      setCart]      = useState({});   // { itemName: qty }
  const [cartOpen,  setCartOpen]  = useState(false);
  const [toast,     setToast]     = useState(null); // { name }
  const [ordered,   setOrdered]   = useState(false);

  const items = [
    { name:"System Espresso",        cat:"Espresso",  amt:"350",   desc:"Ethiopia Yirgacheffe · 9-bar · 28ml double shot",          tag:"BESTSELLER", img:"https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=320&q=80&fit=crop" },
    { name:"Kernel Cortado",         cat:"Espresso",  amt:"400",   desc:"1:1 espresso to steamed milk · House blend",               tag:"",           img:"https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=320&q=80&fit=crop" },
    { name:"Flat White Build",       cat:"Espresso",  amt:"435",   desc:"Ristretto base · Microfoam · Blue ceramic",                tag:"POPULAR",    img:"https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=320&q=80&fit=crop" },
    { name:"Debug Macchiato",        cat:"Espresso",  amt:"375",   desc:"Double ristretto · Dash of textured milk",                 tag:"",           img:"https://images.unsplash.com/photo-1498804103079-a6351b050096?w=320&q=80&fit=crop" },
    { name:"Cloud Foam Latte",       cat:"Cold Brew", amt:"500",   desc:"24h cold brew · Nitrogen charged · Cascara foam",          tag:"NEW",        img:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=320&q=80&fit=crop" },
    { name:"Overflow Iced Matcha",   cat:"Cold Brew", amt:"545",   desc:"Ceremonial matcha · Oat milk · Cold brew float",           tag:"SEASONAL",   img:"https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=320&q=80&fit=crop" },
    { name:"Ice Cold Pipeline",      cat:"Cold Brew", amt:"460",   desc:"Slow-drip concentrate · Sphere ice",                      tag:"",           img:"https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=320&q=80&fit=crop" },
    { name:"Neural Blend Latte",     cat:"Specialty", amt:"585",   desc:"House blend + ashwagandha + lion's mane · Oat milk",      tag:"FUNCTIONAL", img:"https://images.unsplash.com/photo-1541167760496-1628856ab772?w=320&q=80&fit=crop" },
    { name:"Circuit Breaker",        cat:"Specialty", amt:"715",   desc:"Triple espresso · Honey · Cardamom · Ginger",             tag:"STRONG",     img:"https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=320&q=80&fit=crop" },
    { name:"Uptime Chai",            cat:"Specialty", amt:"485",   desc:"Masala chai concentrate · Steamed oat milk",              tag:"",           img:"https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=320&q=80&fit=crop" },
    { name:"Open Source Beans 250g", cat:"Beans",     amt:"1,510", desc:"Colombian Huila · Dark roast · Whole bean",               tag:"TRACEABLE",  img:"https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=320&q=80&fit=crop" },
    { name:"Light Kernel Roast 250g",cat:"Beans",     amt:"1,850", desc:"Ethiopia Guji Natural · Blueberry & jasmine",             tag:"LIMITED",    img:"https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=320&q=80&fit=crop" },
    { name:"House Blend 500g",       cat:"Beans",     amt:"2,690", desc:"Brazil + Ethiopia · Medium roast · Daily driver",         tag:"",           img:"https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=320&q=80&fit=crop" },
    { name:"Croissant.exe",          cat:"Food",      amt:"375",   desc:"Butter-laminated · Baked 6AM · 84 layers",                tag:"FRESH",      img:"https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=320&q=80&fit=crop" },
    { name:"Avocado Stack",          cat:"Food",      amt:"1,010", desc:"Sourdough · Smashed avo · Dukkah · Poached egg",          tag:"",           img:"https://images.unsplash.com/photo-1525351484163-7529414344d8?w=320&q=80&fit=crop" },
    { name:"Granola Kernel",         cat:"Food",      amt:"755",   desc:"House granola · Coconut yoghurt · Seasonal fruit",        tag:"VEGAN",      img:"https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=320&q=80&fit=crop" },
  ];

  // numeric value from amt string for totalling
  const numeric = (amt) => parseInt(amt.replace(/,/g,""), 10);

  const addItem = (item) => {
    setCart(prev => ({ ...prev, [item.name]: (prev[item.name] || 0) + 1 }));
    setToast(item.name);
    setTimeout(() => setToast(null), 1800);
  };
  const changeQty = (name, delta) => {
    setCart(prev => {
      const next = (prev[name] || 0) + delta;
      if (next <= 0) { const c={...prev}; delete c[name]; return c; }
      return { ...prev, [name]: next };
    });
  };

  const totalItems = Object.values(cart).reduce((a,b)=>a+b, 0);
  const totalAmt   = items.reduce((sum, item) => sum + (cart[item.name]||0) * numeric(item.amt), 0);
  const cartItems  = items.filter(i => cart[i.name]);
  const filtered   = active==="All" ? items : items.filter(i=>i.cat===active);

  const tagColors = { NEW:"rgba(0,180,70,0.88)", SEASONAL:"rgba(14,120,200,0.88)", FUNCTIONAL:"rgba(130,60,200,0.88)",
                      STRONG:"rgba(200,50,40,0.88)", BESTSELLER:"rgba(200,120,0,0.88)", POPULAR:"rgba(60,60,200,0.88)",
                      TRACEABLE:"rgba(0,140,100,0.88)", LIMITED:"rgba(180,30,100,0.88)", FRESH:"rgba(200,140,0,0.88)", VEGAN:"rgba(60,160,60,0.88)" };

  return (
    <div className="page-fade" style={{ minHeight:"100vh", background:"#FFFDD0", position:"relative" }}>
      <style>{`
        @keyframes slideInRight { from{transform:translateX(100%);opacity:0} to{transform:translateX(0);opacity:1} }
        @keyframes toastIn { 0%{transform:translateY(20px);opacity:0} 20%{transform:translateY(0);opacity:1} 80%{opacity:1} 100%{opacity:0} }
        @keyframes cartBounce { 0%,100%{transform:scale(1)} 40%{transform:scale(1.3)} 60%{transform:scale(0.95)} }
        .qty-btn { width:30px;height:30px;border-radius:50%;border:none;cursor:pointer;font-size:16px;font-weight:700;display:flex;align-items:center;justify-content:center;transition:all 0.15s; }
        .qty-btn:hover { transform:scale(1.1); }
        .cart-item-row { display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.08); }
      `}</style>

      {/* ── Header ── */}
      <div style={{ padding:"128px 24px 64px", background:"linear-gradient(160deg,#1a0d06,#2d1b13)", textAlign:"center", position:"relative" }}>
        <p className="fira" style={{ fontSize:11,letterSpacing:"0.5em",color:"#00FF41",marginBottom:16 }}>// THE STACK</p>
        <h1 className="playfair" style={{ fontWeight:900,fontStyle:"italic",fontSize:"clamp(40px,6vw,64px)",color:"white",marginBottom:12 }}>Our Menu</h1>
        <p className="fira" style={{ fontSize:12,color:"#9ca3af" }}>Carefully compiled. Obsessively refined. Priced in <INR amount="INR" />.</p>
        {/* Floating cart icon in header */}
        {totalItems > 0 && (
          <button onClick={()=>setCartOpen(true)} style={{ position:"absolute",top:28,right:28,background:"#00FF41",border:"none",borderRadius:999,padding:"10px 18px",display:"flex",alignItems:"center",gap:8,cursor:"pointer",animation:"cartBounce 0.4s ease" }}>
            <span style={{ fontSize:16 }}>🛒</span>
            <span className="fira" style={{ fontSize:12,fontWeight:700,color:"#0a0a0a" }}>{totalItems} item{totalItems>1?"s":""}</span>
            <span className="fira" style={{ fontSize:12,fontWeight:700,color:"#0a0a0a" }}>· <INR amount={totalAmt.toLocaleString("en-IN")} /></span>
          </button>
        )}
      </div>

      {/* ── Sticky cart bar (appears when items in cart) ── */}
      {totalItems > 0 && (
        <div style={{ position:"sticky",top:64,zIndex:40,background:"#2D1B13",padding:"12px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",boxShadow:"0 4px 20px rgba(0,0,0,0.3)" }}>
          <div style={{ display:"flex",alignItems:"center",gap:12 }}>
            <span style={{ fontSize:20 }}>🛒</span>
            <span className="fira" style={{ fontSize:12,color:"white",fontWeight:600 }}>{totalItems} item{totalItems>1?"s":""} in cart</span>
          </div>
          <div style={{ display:"flex",alignItems:"center",gap:16 }}>
            <span className="playfair" style={{ fontWeight:900,fontSize:18,color:"white",fontFamily:"system-ui,sans-serif" }}>
              <INR amount={totalAmt.toLocaleString("en-IN")} />
            </span>
            <button onClick={()=>setCartOpen(true)} style={{ background:"#00FF41",color:"#0a0a0a",border:"none",borderRadius:999,padding:"10px 24px",fontFamily:"'Fira Code',monospace",fontSize:12,fontWeight:700,cursor:"pointer",transition:"all 0.2s" }}>
              View Cart →
            </button>
          </div>
        </div>
      )}

      {/* ── Category filter + grid ── */}
      <div style={{ maxWidth:1280,margin:"0 auto",padding:"48px 24px 80px" }}>
        <div style={{ display:"flex",flexWrap:"wrap",gap:10,justifyContent:"center",marginBottom:48 }}>
          {cats.map(cat=>(
            <button key={cat} onClick={()=>setActive(cat)} className="fira"
              style={{ fontSize:11,fontWeight:600,padding:"8px 20px",borderRadius:999,border:"1.5px solid",transition:"all 0.2s",cursor:"pointer",
                background:active===cat?"#2D1B13":"white", color:active===cat?"#FFFDD0":"#78716c", borderColor:active===cat?"#2D1B13":"#e7e0d8" }}>
              {cat}
            </button>
          ))}
        </div>

        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:24 }}>
          {filtered.map((item)=>{
            const qty = cart[item.name] || 0;
            return (
              <div key={item.name} className="card" style={{ background:"white",borderRadius:24,overflow:"hidden",cursor:"default",boxShadow:"0 4px 20px rgba(45,27,19,0.08)", outline: qty>0?"2px solid #00FF41":"none" }}>
                {/* Photo */}
                <div style={{ position:"relative",height:180,overflow:"hidden",background:"#f0e8e0" }}>
                  <img src={item.img} alt={item.name}
                    style={{ width:"100%",height:"100%",objectFit:"cover",transition:"transform 0.5s ease",display:"block" }}
                    onMouseEnter={e=>e.target.style.transform="scale(1.06)"}
                    onMouseLeave={e=>e.target.style.transform="scale(1)"}
                    onError={e=>{e.target.style.display="none";}} />
                  {item.tag && (
                    <span className="fira" style={{ position:"absolute",top:10,right:10,fontSize:9,padding:"5px 10px",borderRadius:999,fontWeight:700,background:tagColors[item.tag]||"rgba(45,27,19,0.8)",color:"white",letterSpacing:"0.05em" }}>
                      {item.tag}
                    </span>
                  )}
                  {qty > 0 && (
                    <div style={{ position:"absolute",top:10,left:10,width:26,height:26,borderRadius:"50%",background:"#00FF41",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Fira Code',monospace",fontSize:12,fontWeight:900,color:"#0a0a0a" }}>
                      {qty}
                    </div>
                  )}
                </div>

                {/* Body */}
                <div style={{ padding:"18px 20px 20px" }}>
                  <h3 className="playfair" style={{ fontWeight:900,fontSize:16,color:"#2D1B13",marginBottom:6 }}>{item.name}</h3>
                  <p className="fira" style={{ fontSize:10,color:"#78716c",lineHeight:1.7,marginBottom:14 }}>{item.desc}</p>
                  <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",borderTop:"1px solid #f5f0e8",paddingTop:12 }}>
                    {/* Price with proper ₹ */}
                    <span style={{ fontFamily:"system-ui,'Segoe UI',sans-serif",fontWeight:900,fontSize:22,color:"#2D1B13" }}>
                      &#8377;{item.amt}
                    </span>
                    {/* Add / Qty control */}
                    {qty === 0 ? (
                      <button onClick={()=>addItem(item)}
                        style={{ background:"#2D1B13",color:"#FFFDD0",border:"none",borderRadius:999,padding:"9px 20px",fontFamily:"'Fira Code',monospace",fontSize:11,fontWeight:700,cursor:"pointer",transition:"all 0.2s" }}
                        onMouseEnter={e=>{e.currentTarget.style.background="#00FF41";e.currentTarget.style.color="#0a0a0a";}}
                        onMouseLeave={e=>{e.currentTarget.style.background="#2D1B13";e.currentTarget.style.color="#FFFDD0";}}>
                        Add +
                      </button>
                    ) : (
                      <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                        <button className="qty-btn" onClick={()=>changeQty(item.name,-1)}
                          style={{ background:"#f5f0e8",color:"#2D1B13" }}>−</button>
                        <span className="fira" style={{ fontSize:14,fontWeight:700,color:"#2D1B13",minWidth:16,textAlign:"center" }}>{qty}</span>
                        <button className="qty-btn" onClick={()=>changeQty(item.name,1)}
                          style={{ background:"#2D1B13",color:"#FFFDD0" }}>+</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Toast notification ── */}
      {toast && (
        <div style={{ position:"fixed",bottom:100,left:"50%",transform:"translateX(-50%)",background:"#2D1B13",color:"white",padding:"12px 24px",borderRadius:999,fontFamily:"'Fira Code',monospace",fontSize:12,fontWeight:600,zIndex:200,animation:"toastIn 1.8s ease forwards",whiteSpace:"nowrap",boxShadow:"0 8px 30px rgba(0,0,0,0.4)",border:"1px solid rgba(0,255,65,0.3)" }}>
          ✓ &nbsp;{toast} added to cart
        </div>
      )}

      {/* ── Cart Drawer ── */}
      {cartOpen && (
        <>
          {/* Backdrop */}
          <div onClick={()=>setCartOpen(false)} style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:100,backdropFilter:"blur(4px)" }} />
          {/* Drawer */}
          <div style={{ position:"fixed",top:0,right:0,bottom:0,width:"min(420px,100vw)",background:"#1a0d06",zIndex:101,display:"flex",flexDirection:"column",animation:"slideInRight 0.35s cubic-bezier(0.23,1,0.32,1)",boxShadow:"-8px 0 40px rgba(0,0,0,0.5)" }}>
            {/* Drawer header */}
            <div style={{ padding:"24px 24px 20px",borderBottom:"1px solid rgba(255,255,255,0.08)",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
              <div>
                <p className="fira" style={{ fontSize:10,letterSpacing:"0.4em",color:"#00FF41",marginBottom:4 }}>// YOUR ORDER</p>
                <h2 className="playfair" style={{ fontWeight:900,fontSize:22,color:"white" }}>Cart ({totalItems})</h2>
              </div>
              <button onClick={()=>setCartOpen(false)} style={{ background:"rgba(255,255,255,0.06)",border:"none",color:"white",width:36,height:36,borderRadius:"50%",fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center" }}>×</button>
            </div>

            {/* Items list */}
            <div style={{ flex:1,overflowY:"auto",padding:"16px 24px" }}>
              {cartItems.length === 0 ? (
                <div style={{ textAlign:"center",padding:"60px 0",color:"#6b5e55" }}>
                  <div style={{ fontSize:48,marginBottom:16 }}>🛒</div>
                  <p className="fira" style={{ fontSize:12 }}>Your cart is empty</p>
                </div>
              ) : cartItems.map(item=>(
                <div key={item.name} className="cart-item-row">
                  <img src={item.img} alt={item.name} style={{ width:52,height:52,borderRadius:12,objectFit:"cover",flexShrink:0 }} onError={e=>e.target.style.display="none"} />
                  <div style={{ flex:1,minWidth:0 }}>
                    <p className="playfair" style={{ fontWeight:700,fontSize:14,color:"white",marginBottom:2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{item.name}</p>
                    <p style={{ fontFamily:"system-ui,sans-serif",fontSize:13,fontWeight:700,color:"#c8902a" }}>&#8377;{item.amt}</p>
                  </div>
                  <div style={{ display:"flex",alignItems:"center",gap:8,flexShrink:0 }}>
                    <button className="qty-btn" onClick={()=>changeQty(item.name,-1)} style={{ background:"rgba(255,255,255,0.08)",color:"white" }}>−</button>
                    <span className="fira" style={{ fontSize:13,fontWeight:700,color:"white",minWidth:16,textAlign:"center" }}>{cart[item.name]}</span>
                    <button className="qty-btn" onClick={()=>changeQty(item.name,1)} style={{ background:"rgba(0,255,65,0.15)",color:"#00FF41" }}>+</button>
                  </div>
                  <p style={{ fontFamily:"system-ui,sans-serif",fontSize:14,fontWeight:900,color:"white",flexShrink:0,minWidth:64,textAlign:"right" }}>
                    &#8377;{(numeric(item.amt)*cart[item.name]).toLocaleString("en-IN")}
                  </p>
                </div>
              ))}
            </div>

            {/* Drawer footer */}
            {cartItems.length > 0 && !ordered && (
              <div style={{ padding:"20px 24px 28px",borderTop:"1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8 }}>
                  <span className="fira" style={{ fontSize:11,color:"#6b5e55" }}>Subtotal</span>
                  <span style={{ fontFamily:"system-ui,sans-serif",fontSize:15,fontWeight:700,color:"white" }}>&#8377;{totalAmt.toLocaleString("en-IN")}</span>
                </div>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20 }}>
                  <span className="fira" style={{ fontSize:11,color:"#6b5e55" }}>Taxes (5% GST)</span>
                  <span style={{ fontFamily:"system-ui,sans-serif",fontSize:15,fontWeight:700,color:"white" }}>&#8377;{Math.round(totalAmt*0.05).toLocaleString("en-IN")}</span>
                </div>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,paddingTop:16,borderTop:"1px solid rgba(255,255,255,0.1)" }}>
                  <span className="playfair" style={{ fontWeight:900,fontSize:18,color:"white" }}>Total</span>
                  <span style={{ fontFamily:"system-ui,sans-serif",fontWeight:900,fontSize:22,color:"#00FF41" }}>&#8377;{Math.round(totalAmt*1.05).toLocaleString("en-IN")}</span>
                </div>
                <button onClick={()=>{ setOrdered(true); setTimeout(()=>{ setCart({}); setOrdered(false); setCartOpen(false); },3000); }}
                  style={{ width:"100%",background:"#00FF41",color:"#0a0a0a",border:"none",borderRadius:14,padding:"16px",fontFamily:"'Fira Code',monospace",fontSize:13,fontWeight:900,cursor:"pointer",transition:"all 0.3s" }}
                  onMouseEnter={e=>e.currentTarget.style.boxShadow="0 0 24px rgba(0,255,65,0.5)"}
                  onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
                  Place Order →
                </button>
                <button onClick={()=>{setCart({});}} style={{ width:"100%",background:"none",border:"none",color:"#6b5e55",fontFamily:"'Fira Code',monospace",fontSize:11,cursor:"pointer",marginTop:10,padding:8 }}>
                  Clear Cart
                </button>
              </div>
            )}
            {ordered && (
              <div style={{ padding:"32px 24px",textAlign:"center",borderTop:"1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ fontSize:52,marginBottom:16 }}>✅</div>
                <h3 className="playfair" style={{ fontWeight:900,fontSize:22,color:"white",marginBottom:8 }}>Order Placed!</h3>
                <p className="fira" style={{ fontSize:11,color:"#6b5e55",lineHeight:1.8 }}>Your brew is being compiled.<br/>Ready in ~5 minutes.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default PageMenu;
