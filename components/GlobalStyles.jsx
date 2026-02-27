const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Fira+Code:wght@300;400;500;600&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    .playfair { font-family: 'Playfair Display', Georgia, serif; }
    .fira { font-family: 'Fira Code', 'Courier New', monospace; }
    @keyframes twinkle {
      0%,100% { opacity: 0.3; transform: scale(0.8); }
      50% { opacity: 1; transform: scale(1.2); }
    }
    @keyframes rise {
      from { opacity: 0; transform: translateY(40px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes steam {
      0% { opacity: 0; transform: translateY(0) scaleX(1); }
      50% { opacity: 0.6; transform: translateY(-15px) scaleX(1.3); }
      100% { opacity: 0; transform: translateY(-30px) scaleX(0.8); }
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse-glow {
      0%,100% { box-shadow: 0 0 8px #00FF41, 0 0 20px rgba(0,255,65,0.3); }
      50% { box-shadow: 0 0 16px #00FF41, 0 0 40px rgba(0,255,65,0.5); }
    }
    .hero-rise-1 { animation: rise 1s 0.1s ease both; }
    .hero-rise-2 { animation: rise 1s 0.4s ease both; }
    .hero-rise-3 { animation: rise 1s 0.7s ease both; }
    .hero-rise-4 { animation: rise 1s 1s ease both; }
    .steam-1 { animation: steam 2.5s 0s ease-in-out infinite; }
    .steam-2 { animation: steam 2.5s 0.8s ease-in-out infinite; }
    .steam-3 { animation: steam 2.5s 1.6s ease-in-out infinite; }
    .page-fade { animation: fadeIn 0.5s ease both; }
    .card { transition: all 0.4s cubic-bezier(0.23,1,0.32,1); }
    .card:hover { transform: translateY(-10px); box-shadow: 0 30px 60px rgba(0,0,0,0.25); }
    .nav-link { position: relative; }
    .nav-link::after { content:''; position:absolute; bottom:-5px; left:0; width:0; height:1.5px; background:#00FF41; transition:width 0.3s; }
    .nav-link:hover::after, .nav-link.active::after { width:100%; }
    .slant-bottom { clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%); }
    .slant-top { clip-path: polygon(0 7%, 100% 0, 100% 100%, 0 100%); margin-top:-55px; padding-top:75px; }
    .btn-green { background:#00FF41; color:#0a0a0a; cursor:pointer; }
    .btn-green:hover { box-shadow:0 0 24px rgba(0,255,65,0.5); transform:scale(1.04); }
    button { cursor:pointer; }
    input, textarea, select { font-family: 'Fira Code', monospace; }

    /* About page – responsive two-column layout */
    .about-grid {
      display: grid;
      grid-template-columns: 260px 1fr;
      gap: 64px;
      align-items: start;
    }
    @media (max-width: 768px) {
      .about-grid {
        grid-template-columns: 1fr;
        gap: 0;
      }
      .about-nav {
        position: static !important;
        display: flex;
        overflow-x: auto;
        padding: 16px 0 24px;
        border-bottom: 1px solid rgba(45,27,19,0.1);
        margin-bottom: 40px;
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
      .about-nav::-webkit-scrollbar { display: none; }
      .about-nav-track { display: flex; flex-direction: row; gap: 0; }
      .about-nav-indicator { display: none !important; }
      .about-nav-cta { display: none; }
    }
    /* OrderWaitGame styles to avoid inline-style warnings */
    .order-game { min-height: 100vh; background: #1a1a1a; color: #00FF41; font-family: Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto; }
    .order-game-wrap { max-width: 1200px; margin: 0 auto; padding: 20px; display: flex; flex-direction: column; gap: 24px; }
    @media(min-width: 768px) { .order-game-wrap { flex-direction: row; gap: 24px; } }
    .order-sidebar { width: 100%; }
    @media(min-width: 768px) { .order-sidebar { width: 320px; position: sticky; top: 96px; align-self: flex-start; } }
    .order-card { background: #0f0f0f; padding: 16px; border-radius: 12px; box-shadow: 0 8px 30px rgba(0,0,0,0.6); }
    .order-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; gap:12px; }
    .order-mode { display:flex; gap:8px; align-items:center; }
    .mode-btn { padding:6px 10px; border-radius:8px; border:1px solid rgba(255,255,255,0.04); background:transparent; color:#cbd5e1; cursor:pointer; }
    .mode-btn.active { background:#00FF41; color:#06120a; }
    .difficulty-btn { padding:6px 8px; border-radius:6px; border:1px solid rgba(255,255,255,0.03); background:transparent; color:#9ca3af; cursor:pointer; }
    .difficulty-btn.active { color:#00FF41; background:transparent; }
    .order-main { flex:1; }
    .order-target { background: #0b0b0b; border-radius:8px; padding:12px; min-height:180px; font-family: 'Fira Code', monospace; color:#00FF41; font-size:15px; border:1px solid rgba(0,255,65,0.06); }
    .order-form { display:flex; gap:8px; margin-top:12px; }
    .order-input { flex:1; padding:10px 12px; background:#071013; color:#00FF41; border:1px solid rgba(0,255,65,0.08); outline:none; font-family:'Fira Code', monospace; border-radius:6px; }
    .order-submit { background:#00FF41; color:#06120a; border:none; padding:8px 12px; border-radius:8px; font-weight:700; cursor:pointer; }
    .order-ready-modal { position: fixed; inset:0; display:flex; align-items:center; justify-content:center; z-index:60; }
    .order-ready-backdrop { position:absolute; inset:0; background: rgba(0,0,0,0.6); }
    .order-ready-card { position:relative; background:#0f0f0f; color:#00FF41; padding:28px; border-radius:12px; width:min(520px,92vw); text-align:center; box-shadow:0 12px 60px rgba(0,0,0,0.7); }
    /* Additional utility/classes used by OrderWaitGame */
    .order-title { font-weight:800; font-size:18px; }
    .timer-block { margin-top:12px; }
    .timer-display { font-family: 'Fira Code', monospace; font-size:36px; font-weight:900; margin-top:6px; }
    .stats-block { margin-top:18px; display:grid; gap:8px; }
    .stat-label { font-size:12px; opacity:0.8; }
    .stat-value { font-family: 'Fira Code', monospace; color:#00FF41; }
    .stat-value.large { font-size:28px; font-weight:800; }
    .stat-value.small { font-size:18px; }
    .hint { margin-top:16px; font-size:12px; color:#9ca3af; }
    .order-header-left { display:flex; gap:8px; align-items:center; }
    .order-header-right { display:flex; gap:8px; align-items:center; }
    .coffee-pill { font-size:13px; color:#9ca3af; padding:4px 8px; border-radius:6px; background: rgba(0,255,65,0.03); }
    .status { font-size:12px; color:#9ca3af; }
    .status.ready { color:#00FF41; }
    .target-label { opacity:0.6; margin-bottom:8px; }
    .target-pre { white-space: pre-wrap; margin:0; padding:12px; background: linear-gradient(180deg, rgba(0,0,0,0.15), transparent); border-radius:6px; border:1px solid rgba(0,255,65,0.06); }
    .mobile-score { display:none; color:#9ca3af; }
    @media(min-width:768px) { .mobile-score { display:block; } }
    .ready-title { font-size:22px; font-weight:900; }
    .modal-close-btn { background:transparent; color:#9ca3af; border:1px solid rgba(255,255,255,0.04); padding:8px 14px; border-radius:8px; }
    .ready-emoji { font-size:48px; margin-bottom:6px; }
    .ready-desc { color:#cbd5e1; margin-top:8px; }
    .ready-actions { margin-top:16px; display:flex; gap:10px; justify-content:center; }
    .section-title { font-size:14px; color:#cbd5e1; }
    .btn-group { display:flex; gap:6px; }
    .btn-group-margin { margin-left:8px; display:flex; gap:6px; }
    /* Palette/workspace specific */
    .palette-item { padding:10px; border-radius:8px; background:linear-gradient(90deg,#151515,#1a1210); border:1px solid rgba(255,255,255,0.04); cursor:grab; }
    .workspace-item { display:flex; justify-content:space-between; align-items:center; padding:10px; border-radius:8px; background:#141214; border:1px solid rgba(255,255,255,0.03); }
    /* RecursiveRoastGame styles */
    .roast-wrap { min-height:100vh; background:#1A1A1A; color:#00FF41; font-family:'Fira Code', monospace; padding:20px; }
    .roast-grid { display:grid; grid-template-columns:320px 1fr 320px; gap:18px; }
    /* Mobile responsive: stack vertically and enlarge touch targets */
    @media (max-width: 768px) {
      .roast-grid { grid-template-columns: 1fr; gap: 14px; height: auto; }
      .panel, .panel.panel-muted { padding: 14px; border-radius: 12px; }
      .block { padding: 14px 12px; font-size: 16px; border-radius: 10px; }
      .workspace-item { padding: 14px; font-size: 15px; }
      .progress-bar { height: 12px; }
      .grinder, .filter-anim, .kettle { width: 64px; height: 64px; }
      .cup-preview svg { width: 160px; height: 160px; }
      .run-btn, .clear-btn { width: 100%; display: block; }
      .roast-wrap { padding: 14px; }
    }
    .panel { background:#0f0f0f; padding:12px; border-radius:10px; }
    .panel-muted { background:#0b0b0b; }
    .block { padding:10px; border-radius:8px; background:linear-gradient(90deg,#151515,#1a1210); border:1px solid rgba(255,255,255,0.04); cursor:grab; }
    .block.vs-fn { background: linear-gradient(90deg,#372a6a,#5b3ca6); color:#f3e8ff; }
    .block.vs-var { background: linear-gradient(90deg,#1e6fb8,#3aa0ff); color:#e8f6ff; }
    .workspace-list { display:flex; flex-direction:column; gap:8px; min-height:160px; }
    .cup-preview { display:flex; align-items:center; justify-content:center; height:260px; }
    .progress-bar { width:100%; height:12px; background:#071013; border-radius:8px; border:1px solid rgba(0,255,65,0.06); overflow:hidden; }
    .progress-fill { height:100%; background:linear-gradient(90deg,#c8902a,#5a2a0a); transition:width 400ms ease; }
    .run-btn { background:#00FF41; color:#06120a; padding:8px 12px; border-radius:8px; border:none; font-weight:700; cursor:pointer; }
    .clear-btn { background:transparent; border:1px solid rgba(255,255,255,0.04); color:#9ca3af; padding:8px 12px; border-radius:8px; cursor:pointer; }
    .message { margin-top:12px; padding:10px; border-radius:8px; }
    /* Animation keyframes for RecursiveRoastGame */
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes dropIn { from { transform: translateY(-18px) scale(0.96); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    @keyframes steamRise { 0% { transform: translateY(6px); opacity: 0; } 50% { opacity: 0.6; } 100% { transform: translateY(-28px); opacity: 0; } }
    @keyframes pourStream { 0% { height: 0; opacity: 0 } 10% { opacity: 1 } 100% { height: 64px; opacity: 1 } }
    @keyframes servePulse { 0% { transform: scale(0.96); opacity: 0.8 } 50% { transform: scale(1.06); opacity: 1 } 100% { transform: scale(1); opacity: 1 } }

    .grinder { width:80px; height:80px; border-radius:8px; background:linear-gradient(180deg,#2b2430,#3c2d44); display:flex; align-items:center; justify-content:center; color:#f3e8ff; }
    .grinder.spin { animation: spin 900ms linear infinite; }
    .filter-anim { width:72px; height:72px; background:linear-gradient(180deg,#2b1f18,#2d1410); border-radius:8px; display:flex; align-items:center; justify-content:center; color:#c8f7d1; transform-origin:center; }
    .filter-anim.enter { animation: dropIn 420ms cubic-bezier(.2,.8,.2,1) both; }
    .kettle { width:72px; height:72px; background:linear-gradient(180deg,#2b3b4a,#16313a); border-radius:8px; display:flex; align-items:center; justify-content:center; color:#e8f6ff; position:relative; overflow:visible }
    .steam { position:absolute; top:-6px; left:50%; transform:translateX(-50%); }
    .steam .p { width:8px; height:24px; background:linear-gradient(180deg,rgba(255,255,255,0.45),rgba(255,255,255,0.06)); border-radius:8px; opacity:0; animation: steamRise 2200ms ease-in-out infinite; margin:0 4px; display:inline-block }
    .pour { width:10px; background:#c8902a; display:block; margin:0 auto; opacity:0; animation: pourStream 420ms linear both; }
    .serve-burst { animation: servePulse 620ms ease both; }
    .serve-burst { padding: 12px; border-radius: 12px; background: linear-gradient(90deg,#18321a,#06220f); color: #c8ffdc; }
    
    /* Helper classes to replace inline styles in OrderWaitGame.tsx */
    .roast-title { font-size:22px; margin-bottom:12px; }
    .subtle-label { font-size:12px; color:#9ca3af; margin-bottom:8px; }
    .palette-column { display:flex; flex-direction:column; gap:8px; }
    .panel-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; }
    .timer-inline { font-family: 'Fira Code', monospace; font-size:14px; }
    .empty-hint { color:#6b6b6b; }
    .workspace-actions { display:flex; gap:8px; }
    .actions-row { margin-top:12px; display:flex; gap:8px; }
    .message.success { background: rgba(0,255,65,0.08); color:#00FF41; }
    .message.fail { background: rgba(255,50,50,0.06); color:#ff7b7b; }
    .preview-row { display:flex; gap:14px; align-items:flex-start; }
    .preview-left { width:120px; display:flex; flex-direction:column; align-items:center; gap:10px; }
    .flex-grow { flex: 1; }
    .progress-label { margin-top: 12px; font-size: 13px; color: #cbd5e1; }
    .progress-bar { margin-top:8px; }
    .serve-row { margin-top:12px; display:flex; justify-content:center; }
    .ready-emoji { font-size:48px; margin-bottom:6px; }
    .order-ready-modal { position:fixed; inset:0; display:flex; align-items:center; justify-content:center; z-index:60; }
    .order-ready-backdrop { position:absolute; inset:0; background: rgba(0,0,0,0.6); }
    .order-ready-card { position:relative; background:#0f0f0f; color:#00FF41; padding:28px; border-radius:12px; width:min(520px,92vw); text-align:center; }
    /* animation-delay helpers for steam particles */
    .p.delay-0 { animation-delay: 0ms; }
    .p.delay-400 { animation-delay: 400ms; }
    .p.delay-800 { animation-delay: 800ms; }

    /* Full-height layout tweaks */
    .roast-wrap { min-height:100vh; padding:28px; box-sizing:border-box; }
    .roast-grid { height: calc(100vh - 92px); align-items:start; }
  `}</style>
);

export default GlobalStyles;

