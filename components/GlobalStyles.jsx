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
  `}</style>
);

export default GlobalStyles;
