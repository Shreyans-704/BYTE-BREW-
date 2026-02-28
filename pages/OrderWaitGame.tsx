import React, { useEffect, useRef, useState } from "react";

type Block = { id: string; label: string; kind?: string };

const PALETTE: Block[] = [
  { id: "grind", label: "Grind Beans", kind: "fn" },
  { id: "filter", label: "Insert Filter", kind: "action" },
  { id: "heat", label: "Heat Water (90°C)", kind: "var" },
  { id: "pour", label: "Recursive Pour", kind: "fn" },
  { id: "serve", label: "Serve", kind: "action" },
];

const EXPECTED_SEQUENCE = [
  "Grind Beans",
  "Insert Filter",
  "Heat Water (90°C)",
  "Recursive Pour",
  "Serve",
];

export default function RecursiveRoastGame(): JSX.Element {
  const [timer, setTimer] = useState<number>(60);
  const [isOrderReady, setIsOrderReady] = useState(false);
  const [workspace, setWorkspace] = useState<Block[]>([]);
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const dragSrc = useRef<string | null>(null);
  const progressFillRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          clearInterval(id);
          onTimeUp();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onTimeUp() {
    setIsOrderReady(true);
    playAlarm();
    setMessage("Time's up — your Byte is ready at the counter.");
  }

  function playAlarm() {
    try { new Audio("/alarm.mp3").play().catch(() => beep()); } catch { beep(); }
  }

  function beep() {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "square"; o.frequency.value = 880; g.gain.value = 0.08; o.connect(g); g.connect(ctx.destination); o.start();
      setTimeout(() => { o.stop(); ctx.close(); }, 600);
    } catch {}
  }

  // HTML5 drag handlers
  function onDragStart(e: React.DragEvent, id: string) {
    dragSrc.current = id;
    e.dataTransfer.effectAllowed = "copyMove";
    e.dataTransfer.setData("text/plain", id);
  }

  function onDragOver(e: React.DragEvent) { e.preventDefault(); }

  function onDropToWorkspace(e: React.DragEvent, index?: number) {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    if (!data) return;

    // palette -> workspace
    const paletteItem = PALETTE.find((p) => p.id === data);
    if (paletteItem) {
      const copy: Block = { ...paletteItem, id: `${paletteItem.id}_${Date.now()}` };
      setWorkspace((w) => {
        const next = [...w];
        if (typeof index === "number") next.splice(index, 0, copy);
        else next.push(copy);
        return next;
      });
      return;
    }

    // reorder within workspace
    const wsItem = workspace.find((it) => it.id === data);
    if (wsItem) {
      setWorkspace((w) => {
        const without = w.filter((x) => x.id !== data);
        if (typeof index === "number") without.splice(index, 0, wsItem);
        else without.push(wsItem);
        return without;
      });
    }
  }

  // Tap/click behavior for mobile: add directly from palette
  function addFromPalette(id: string) {
    const paletteItem = PALETTE.find((p) => p.id === id);
    if (!paletteItem) return;
    const copy: Block = { ...paletteItem, id: `${paletteItem.id}_${Date.now()}` };
    setWorkspace((w) => [...w, copy]);
  }

  function removeAt(i: number) { setWorkspace((w) => w.filter((_, idx) => idx !== i)); }

  function runCode() {
    const seq = workspace.map((b) => b.label);
    const idxPour = seq.indexOf("Recursive Pour");
    const idxGrind = seq.indexOf("Grind Beans");
    if (idxPour !== -1 && idxGrind === -1) {
      setMessage("NullPointerException: No Grounds Found"); setSuccess(false); return;
    }
    if (seq.length < EXPECTED_SEQUENCE.length) { setMessage("Build Failed: sequence incomplete"); setSuccess(false); return; }
    for (let i = 0; i < EXPECTED_SEQUENCE.length; i++) {
      if (seq[i] !== EXPECTED_SEQUENCE[i]) { setMessage(`Build Failed: expected '${EXPECTED_SEQUENCE[i]}' at position ${i+1}`); setSuccess(false); return; }
    }
    setMessage("Build Successful: Coffee Compiled at 127.0.0.1"); setSuccess(true); playSuccessTone();
  }

  function playSuccessTone() {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const o1 = ctx.createOscillator(); const o2 = ctx.createOscillator(); const g = ctx.createGain();
      o1.type = "sine"; o2.type = "sine"; o1.frequency.value=660; o2.frequency.value=880; g.gain.value=0.06; o1.connect(g); o2.connect(g); g.connect(ctx.destination); o1.start(); o2.start();
      setTimeout(()=>{ o1.stop(); o2.stop(); ctx.close(); },450);
    } catch {}
  }

  const correctPrefix = (() => {
    const seq = workspace.map((b) => b.label);
    let i = 0; while (i < EXPECTED_SEQUENCE.length && seq[i] === EXPECTED_SEQUENCE[i]) i++; return i;
  })();

  const fillPct = Math.round((correctPrefix / EXPECTED_SEQUENCE.length) * 100);

  useEffect(() => {
    if (progressFillRef.current) {
      progressFillRef.current.style.width = `${fillPct}%`;
    }
  }, [fillPct]);

  return (
    <div className="roast-wrap game-page-main">
      <h2 className="playfair roast-title">Recursive Roast — Order Zone</h2>
      <div className="roast-grid">
        <div className="panel">
          <div className="subtle-label">Blocks</div>
          <div className="palette-column">
            {PALETTE.map((p) => (
              <div
                key={p.id}
                className={`block ${p.kind==='fn'?'vs-fn':p.kind==='var'?'vs-var':''}`}
                draggable
                onDragStart={(e)=>onDragStart(e,p.id)}
                onClick={() => addFromPalette(p.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') addFromPalette(p.id); }}
                aria-label={`Add ${p.label}`}
              >
                {p.label}
              </div>
            ))}
          </div>
        </div>

        <div className="panel panel-muted" onDragOver={onDragOver} onDrop={(e)=>onDropToWorkspace(e)}>
          <div className="panel-header">
            <div className="section-title">Workspace</div>
            <div className="timer-inline">{String(Math.floor(timer/60)).padStart(2,'0')}:{String(timer%60).padStart(2,'0')}</div>
          </div>
          <div className="workspace-list">
            {workspace.length===0 && <div className="empty-hint">Drag blocks here or click to add.</div>}
            {workspace.map((b, idx) => (
              <div key={b.id} draggable onDragStart={(e)=>onDragStart(e,b.id)} onDrop={(e)=>onDropToWorkspace(e, idx)} onDragOver={onDragOver} className="workspace-item">
                <div>{b.label}</div>
                <div className="workspace-actions">
                  <button onClick={()=>removeAt(idx)} className="clear-btn">Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="actions-row">
            <button onClick={()=>setWorkspace([])} className="clear-btn">Clear</button>
            <button onClick={runCode} className="run-btn">Run Code</button>
          </div>
          {message && (
            <div className={`message ${success? 'success' : 'fail'}`}>{message}</div>
          )}
        </div>

        <div className="panel">
          <div className="subtle-label">Coffee Preview</div>
          <div className="preview-row">
            <div className="preview-left">
              <div className={`grinder ${correctPrefix >= 1 ? 'spin' : ''}`} title="Grinder">☕</div>
              <div className={`filter-anim ${correctPrefix >= 2 ? 'enter' : ''}`} title="Filter">🧺</div>
              <div className="kettle" title="Kettle">
                🔥
                <div className="steam">
                  <span className="p delay-0" />
                  <span className="p delay-400" />
                  <span className="p delay-800" />
                </div>
              </div>
            </div>

            <div className="flex-grow">
              <div className="cup-preview">
                <svg viewBox="0 0 200 200" width={200} height={200}>
                  <g transform="translate(40,20)">
                    <rect x={0} y={0} width={120} height={140} rx={16} fill="none" stroke="#2d1b13" strokeWidth={3} />
                    <clipPath id="cupClip2"><rect x={0} y={0} width={120} height={140} rx={16} /></clipPath>
                    <rect x={0} y={140 - (fillPct/100)*140} width={120} height={(fillPct/100)*140} rx={16} fill="url(#grad2)" clipPath="url(#cupClip2)" />
                    <defs>
                      <linearGradient id="grad2" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#c8902a" />
                        <stop offset="100%" stopColor="#5a2a0a" />
                      </linearGradient>
                    </defs>
                    {correctPrefix >= 4 && (
                      <rect x={48} y={20} width={10} height={Math.max(10, (fillPct/100)*120)} rx={4} fill="#c8902a" opacity={0.95} />
                    )}
                  </g>
                </svg>
              </div>
              <div className="progress-label">Progress: {fillPct}%</div>
              <div className="progress-bar">
                <div ref={progressFillRef} className="progress-fill" />
              </div>
            </div>
          </div>

          {success && (
            <div className="serve-row">
              <div className="serve-burst" aria-hidden>Build Successful — Enjoy!</div>
            </div>
          )}
        </div>
      </div>

      {isOrderReady && (
        <div className="order-ready-modal">
          <div className="order-ready-backdrop" />
          <div className="order-ready-card">
            <div className="ready-emoji">🔔</div>
            <h2 className="playfair ready-title">Your Byte is Ready!</h2>
            <p className="ready-desc">Your order is done — pick it up at the counter.</p>
            <div className="ready-actions">
              <button onClick={()=>setIsOrderReady(false)} className="clear-btn">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
