import { useEffect, useRef, useState } from "react";

/* ── data ─────────────────────────────────────────────────── */
const SECTIONS = [
  {
    id: "digital-roots",
    label: "Our Digital Roots",
    tag: "// ORIGIN_STORY.md",
    headline: "Where Silicon\nMet the\nSteam Wand.",
    body: [
      "ByteBrew was born in 2023 in a 2 BHK flat in Indiranagar, Bengaluru — where Arjun Sharma, a burned-out senior engineer from a unicorn startup, made filter coffee from beans his mother sent from Coorg. That cup became an obsession. His manifesto: if we can architect distributed systems with five-nines uptime, we can perfect Indian coffee.",
      "Priya Nair, whose family has farmed the slopes of Madikeri for three generations, joined with estate-direct beans and decades of instinct. The first menu was a README pushed to GitHub. The first loyalty card, a QR code printed on a chai tapri receipt.",
      "ByteBrew opened not as a café but as a statement — that Indian-grown coffee, treated with the same rigour as software, could stand alongside any cup in the world.",
    ],
    stats: [["2023","Founded","📅"],["3","Co-founders","👥"],["Bengaluru","HQ","📍"]],
    accent: "#00FF41",
  },
  {
    id: "hardware-beans",
    label: "Hardware & Beans",
    tag: "// HARDWARE_SPEC.json",
    headline: "Estate-Direct\nBeans.\nPrecision Hardware.",
    body: [
      "Every roast profile at ByteBrew is version-controlled in a public repository. Roast curves, RoR targets, and degassing windows are tagged like releases — never shipped to the grinder without a cupping session that the whole team votes on.",
      "We source exclusively from estates that publish altitude, variety, and processing method on a shared ledger. Coorg Robusta & Arabica blends at 1,000 m. Chikmagalur washed single-Estate. Wayanad natural-process. Nilgiris micro-lot. Every bag is traceable to a named farmer.",
      "Hardware stack: a Probat P5 sample roaster with custom PID, Mahlkönig EK43 for filter and a dedicated espresso grinder on the bar, and a La Marzocca Linea synced to a live extraction dashboard. Because great Indian coffee deserves world-class tools.",
    ],
    stats: [["4","Estate Partners","🌿"],["8","Roast Profiles","🔥"],["100%","Traceable","🔍"]],
    accent: "#c8902a",
  },
  {
    id: "tech-lab",
    label: "The Tech Lab",
    tag: "// WORKSPACE.config",
    headline: "Coding Pods.\n1 Gbps Fiber.\nUnlimited Filter.",
    body: [
      "The café floor is laid out like a well-structured monorepo — distinct zones, clear purpose, zero noise bleed. Six private coding pods line the window wall: height-adjustable desks, 4K monitors, mechanical keyboards, and power strips built for a full dev setup.",
      "Network is a first-class citizen. Symmetrical 1 Gbps fibre from ACT Fibernet. WPA3 segmented Wi-Fi per pod. No throttling, no content filtering, no captive portal nonsense. Your standup call will not drop. We guarantee it.",
      "A live \"commit wall\" near the bar displays contributions from the ByteBrew community — open-source brew recipes, estate tasting notes, and roast firmware patches. Regulars from Flipkart, Razorpay, and CRED have all left commits on it.",
    ],
    stats: [["6","Coding Pods","💻"],["1 Gbps","Fiber","📡"],["∞","Filter Refills","☕"]],
    accent: "#7c3aed",
  },
  {
    id: "sustainability",
    label: "Sustainability.exe",
    tag: "// ECO_REPORT.log",
    headline: "Zero-Carbon\nFootprint.\nCompiled.",
    body: [
      "Sustainability is a hard constraint at ByteBrew, not a brand slide. Every supplier is scored on a carbon and ethics rubric before the first order is placed. If it fails the audit, it doesn't make the menu — regardless of how good it tastes.",
      "Spent coffee grounds are returned monthly to our Coorg and Chikmagalur estate partners as compost, closing the nutrient loop from roaster back to soil. Packaging is kraft paper + beeswax — compostable within 90 days. We are working toward 100% plastic-free operations by end of 2025.",
      "Our roastery in HSR Layout runs on a rooftop solar array that generated 3,800 kWh surplus last quarter, sold back to BESCOM. Waste-to-landfill sits at 2.1%. The target is zero. We treat it like a critical bug — it ships fixed or it doesn't ship.",
    ],
    stats: [["97%","Waste-Free","♻️"],["Solar","Powered","☀️"],["0","Plastic Goal","🌱"]],
    accent: "#00FF41",
  },
];

const TEAM = [
  { name:"Arjun Sharma", role:"Founder & CEO", emoji:"🧑‍💻", bio:"Ex-senior engineer at a Bengaluru unicorn. Rage-quit on-call to chase extraction ratios. Runs ByteBrew like a distributed system — resilient, observable, always up." },
  { name:"Priya Nair", role:"Head Roaster & Bean Sourcer", emoji:"👩‍🌾", bio:"Third-generation Coorg estate farmer turned specialty roaster. Knows the difference between washed and natural at first sniff. The beans are her code." },
  { name:"Kavya Reddy", role:"UX Barista & Designer", emoji:"👩‍🎨", bio:"Product designer from Hyderabad who quit fintech for filter coffee. Every menu, every cup, every counter is a user flow she has wireframed and shipped." },
];

/* ── component ────────────────────────────────────────────── */
function PageAbout({ navigate }) {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);
  const [indicatorY, setIndicatorY] = useState(0);
  const sectionRefs = useRef({});
  const navItemRefs = useRef({});
  const observerRef = useRef(null);

  /* scroll-spy via IntersectionObserver */
  useEffect(() => {
    const opts = { root: null, rootMargin: "-35% 0px -55% 0px", threshold: 0 };
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveId(entry.target.dataset.sid);
      });
    }, opts);
    SECTIONS.forEach(({ id }) => {
      const el = sectionRefs.current[id];
      if (el) observerRef.current.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, []);

  /* sync indicator pill position */
  useEffect(() => {
    const el = navItemRefs.current[activeId];
    if (el) setIndicatorY(el.offsetTop);
  }, [activeId]);

  const scrollTo = (id) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="page-fade" style={{ background: "#FFFDD0", minHeight: "100vh" }}>

      {/* ── HERO ── */}
      <div style={{
        padding: "128px 24px 88px",
        background: "linear-gradient(160deg,#0a0f0a,#1a1208,#2d1b13)",
        textAlign: "center",
      }}>
        <p className="fira" style={{ fontSize: 10, letterSpacing: "0.5em", color: "#00FF41", marginBottom: 16 }}>// ABOUT.md</p>
        <h1 className="playfair" style={{
          fontWeight: 900, fontStyle: "italic",
          fontSize: "clamp(40px,6vw,80px)",
          color: "white", lineHeight: 1.05, marginBottom: 24,
        }}>
          Built for<br /><span style={{ color: "#c8902a" }}>every coffee hacker.</span>
        </h1>
        <p className="fira" style={{ fontSize: 13, color: "#9ca3af", maxWidth: 500, margin: "0 auto", lineHeight: 1.9 }}>
          Born at the intersection of obsessive engineering and artisan craft —<br />
          explore the architecture of ByteBrew below.
        </p>
      </div>

      {/* ── TWO-COLUMN STICKY SCROLL ── */}
      <div className="about-grid" style={{
        maxWidth: 1160,
        margin: "0 auto",
        padding: "80px 24px 80px",
      }}>

        {/* LEFT – sticky nav */}
        <nav className="about-nav" style={{
          position: "sticky",
          top: 96,
          paddingTop: 8,
        }}>
          <p className="fira" style={{ fontSize: 9, letterSpacing: "0.45em", color: "#9ca3af", marginBottom: 28, textTransform: "uppercase" }}>
            // table_of_contents
          </p>

          {/* animated indicator bar */}
          <div style={{ position: "relative" }}>
            {/* track line */}
            <div style={{
              position: "absolute",
              left: 0, top: 0, bottom: 0,
              width: 1,
              background: "rgba(45,27,19,0.12)",
            }} />
            {/* active pill */}
            <div style={{
              position: "absolute",
              left: 0,
              top: indicatorY,
              width: 2,
              height: 52,
              background: "#00FF41",
              borderRadius: 2,
              transition: "top 0.35s cubic-bezier(0.4,0,0.2,1)",
              boxShadow: "0 0 10px rgba(0,255,65,0.45)",
            }} />

            {SECTIONS.map(({ id, label }) => {
              const isActive = activeId === id;
              return (
                <button
                  key={id}
                  ref={(el) => (navItemRefs.current[id] = el)}
                  onClick={() => scrollTo(id)}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    background: "none",
                    border: "none",
                    paddingLeft: 20,
                    paddingTop: 14,
                    paddingBottom: 14,
                    cursor: "pointer",
                    transition: "all 0.25s",
                  }}
                >
                  <span
                    className={isActive ? "playfair" : "fira"}
                    style={{
                      fontSize: isActive ? 15 : 12,
                      fontWeight: isActive ? 700 : 400,
                      color: isActive ? "#0a0f0a" : "#9ca3af",
                      letterSpacing: isActive ? "-0.01em" : "0.02em",
                      transition: "all 0.25s",
                      display: "block",
                      lineHeight: 1.4,
                    }}
                  >
                    {label}
                  </span>
                  {isActive && (
                    <span className="fira" style={{ fontSize: 9, color: "#00FF41", letterSpacing: "0.2em", marginTop: 3, display: "block" }}>
                      active
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* CTA below nav */}
          <div style={{ marginTop: 48, paddingLeft: 20 }}>
            <button
              onClick={() => { navigate("Story"); window.scrollTo(0, 0); }}
              style={{
                border: "1px solid rgba(45,27,19,0.15)",
                borderRadius: 8,
                background: "transparent",
                padding: "10px 18px",
                fontFamily: "'Fira Code', monospace",
                fontSize: 10,
                color: "#78716c",
                cursor: "pointer",
                letterSpacing: "0.1em",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#00FF41"; e.currentTarget.style.color = "#0a0f0a"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(45,27,19,0.15)"; e.currentTarget.style.color = "#78716c"; }}
            >
              Read Full Story →
            </button>
          </div>
        </nav>

        {/* RIGHT – scrollable content */}
        <div>
          {SECTIONS.map(({ id, tag, headline, body, stats, accent }, idx) => (
            <section
              key={id}
              data-sid={id}
              ref={(el) => (sectionRefs.current[id] = el)}
              style={{
                paddingTop: idx === 0 ? 0 : 96,
                paddingBottom: 96,
                borderBottom: idx < SECTIONS.length - 1 ? "1px solid rgba(45,27,19,0.08)" : "none",
              }}
            >
              {/* tag */}
              <p className="fira" style={{ fontSize: 10, letterSpacing: "0.4em", color: accent, marginBottom: 20 }}>{tag}</p>

              {/* headline */}
              <h2
                className="playfair"
                style={{
                  fontWeight: 900,
                  fontSize: "clamp(32px,3.5vw,52px)",
                  color: "#0a0f0a",
                  lineHeight: 1.12,
                  marginBottom: 36,
                  whiteSpace: "pre-line",
                }}
              >
                {headline}
              </h2>

              {/* stat pills */}
              <div style={{ display: "flex", gap: 12, marginBottom: 40, flexWrap: "wrap" }}>
                {stats.map(([val, lbl, emoji]) => (
                  <div
                    key={lbl}
                    style={{
                      background: "white",
                      border: `1px solid ${accent}22`,
                      borderRadius: 12,
                      padding: "14px 20px",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                    }}
                  >
                    <span style={{ fontSize: 22 }}>{emoji}</span>
                    <div>
                      <div className="playfair" style={{ fontWeight: 900, fontSize: 18, color: "#0a0f0a", lineHeight: 1 }}>{val}</div>
                      <div className="fira" style={{ fontSize: 9, color: "#9ca3af", letterSpacing: "0.2em", marginTop: 3 }}>{lbl}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* body paragraphs */}
              {body.map((para, i) => (
                <p
                  key={i}
                  className="fira"
                  style={{
                    fontSize: 12.5,
                    color: "#4b4440",
                    lineHeight: 1.9,
                    marginBottom: i < body.length - 1 ? 22 : 0,
                    maxWidth: 640,
                  }}
                >
                  {para}
                </p>
              ))}

              {/* decorative accent line */}
              <div style={{
                width: 48,
                height: 2,
                background: accent,
                borderRadius: 2,
                marginTop: 40,
                boxShadow: `0 0 8px ${accent}66`,
              }} />
            </section>
          ))}
        </div>
      </div>

      {/* ── TEAM ── */}
      <div style={{ background: "#FFFDD0", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p className="fira" style={{ fontSize: 10, letterSpacing: "0.4em", color: "#78716c", marginBottom: 12 }}>// THE_TEAM</p>
            <h2 className="playfair" style={{ fontWeight: 900, fontSize: "clamp(28px,3vw,42px)", color: "#0a0f0a" }}>Who Brews This</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
            {TEAM.map((m, i) => (
              <div
                key={i}
                className="card"
                style={{ background: "white", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(45,27,19,0.07)", boxShadow: "0 4px 24px rgba(45,27,19,0.08)" }}
              >
                <div style={{ height: 140, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 72, background: "linear-gradient(135deg,#2d1b13,#4a2c1a)" }}>{m.emoji}</div>
                <div style={{ padding: 28 }}>
                  <h3 className="playfair" style={{ fontWeight: 800, fontSize: 20, color: "#0a0f0a", marginBottom: 6 }}>{m.name}</h3>
                  <p className="fira" style={{ fontSize: 9, color: "#00AA22", letterSpacing: "0.25em", marginBottom: 14 }}>{m.role}</p>
                  <p className="fira" style={{ fontSize: 11, color: "#78716c", lineHeight: 1.8 }}>{m.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

export default PageAbout;
