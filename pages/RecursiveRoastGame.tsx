import React, { useEffect, useRef, useState } from "react";
import { DndContext, DragEndEvent, closestCenter, useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, rectSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion, AnimatePresence } from "framer-motion";

type Block = { id: string; label: string; kind?: string };

const PALETTE: Block[] = [
  { id: "grind", label: "Grind Beans", kind: "action" },
  { id: "filter", label: "Insert Filter", kind: "action" },
  { id: "heat", label: "Heat Water (90°C)", kind: "action" },
  { id: "pour", label: "Recursive Pour", kind: "action" },
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
  const [isOrderReady, setIsOrderReady] = useState<boolean>(false);
  const [workspace, setWorkspace] = useState<Block[]>([]);
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const dragItem = useRef<{ origin: "palette" | "workspace"; index: number | null } | null>(null);

  const sensors = useSensors(useSensor(PointerSensor));

  // countdown
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
    // try to play /alarm.mp3 if available, fallback to beep
    try {
      const audio = new Audio("/alarm.mp3");
      audio.play().catch(() => {
        beep();
      });
    } catch (e) {
      beep();
    }
  }

  function beep() {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "square";
      o.frequency.value = 880;
      g.gain.value = 0.08;
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      setTimeout(() => { o.stop(); ctx.close(); }, 600);
    } catch (e) { /* ignore */ }
  }

  // dnd-kit handlers
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    // If dragging from palette -> create new block in workspace
    if (activeId.startsWith("palette-")) {
      // compute insert index
      if (overId.startsWith("workspace-")) {
        const targetId = overId.replace("workspace-", "");
        const idx = workspace.findIndex((w) => w.id === targetId);
        const paletteIndex = Number(activeId.replace("palette-", ""));
        const block = PALETTE[paletteIndex];
        const insert = { ...block, id: block.id + "_" + Date.now() };
        setWorkspace((w) => {
          const next = [...w];
          next.splice(idx, 0, insert);
          return next;
        });
      } else {
        // drop to end
        const paletteIndex = Number(activeId.replace("palette-", ""));
        const block = PALETTE[paletteIndex];
        const insert = { ...block, id: block.id + "_" + Date.now() };
        setWorkspace((w) => [...w, insert]);
      }
      return;
    }

    // If reorder within workspace
    if (activeId.startsWith("workspace-") && overId.startsWith("workspace-")) {
      const activeKey = activeId.replace("workspace-", "");
      const overKey = overId.replace("workspace-", "");
      const oldIndex = workspace.findIndex((w) => w.id === activeKey);
      const newIndex = workspace.findIndex((w) => w.id === overKey);
      if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
        setWorkspace((w) => arrayMove(w, oldIndex, newIndex));
      }
    }
  }

  function removeAt(i: number) { setWorkspace((w) => w.filter((_, idx) => idx !== i)); }

  // Run validation
  function runCode() {
    const seq = workspace.map((b) => b.label);
    // quick rule: if Pour before Grind -> error
    const idxPour = seq.indexOf("Recursive Pour");
    const idxGrind = seq.indexOf("Grind Beans");
    if (idxPour !== -1 && idxGrind === -1) {
      setMessage("NullPointerException: No Grounds Found");
      setSuccess(false);
      return;
    }

    // check exact order match
    if (seq.length < EXPECTED_SEQUENCE.length) {
      setMessage("Build Failed: sequence incomplete");
      setSuccess(false);
      return;
    }

    for (let i = 0; i < EXPECTED_SEQUENCE.length; i++) {
      if (seq[i] !== EXPECTED_SEQUENCE[i]) {
        setMessage(`Build Failed: expected '${EXPECTED_SEQUENCE[i]}' at position ${i + 1}`);
        setSuccess(false);
        return;
      }
    }

    // success
    setMessage("Build Successful: Coffee Compiled at 127.0.0.1");
    setSuccess(true);
    playSuccessTone();
  }

  function playSuccessTone() {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const o1 = ctx.createOscillator();
      const o2 = ctx.createOscillator();
      const g = ctx.createGain();
      o1.type = "sine"; o2.type = "sine";
      o1.frequency.value = 660; o2.frequency.value = 880;
      g.gain.value = 0.06;
      o1.connect(g); o2.connect(g); g.connect(ctx.destination);
      o1.start(); o2.start();
      setTimeout(() => { o1.stop(); o2.stop(); ctx.close(); }, 450);
    } catch (e) {}
  }

  // compute how many in prefix match expected for cup fill
  const correctPrefix = (() => {
    const seq = workspace.map((b) => b.label);
    let i = 0;
    while (i < EXPECTED_SEQUENCE.length && seq[i] === EXPECTED_SEQUENCE[i]) i++;
    return i;
  })();

  const fillPct = Math.round((correctPrefix / EXPECTED_SEQUENCE.length) * 100);

  return (
    <div style={{ minHeight: "100vh", background: "#1A1A1A", color: "#00FF41", padding: 20, fontFamily: "'Fira Code', monospace" }}>
      <h2 className="playfair" style={{ fontSize: 22, marginBottom: 12 }}>Recursive Roast — Order Zone</h2>
      <div style={{ display: "grid", gridTemplateColumns: "320px 1fr 320px", gap: 18 }}>
        {/* Palette */}
        <div style={{ background: "#0f0f0f", padding: 12, borderRadius: 10 }}>
          <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 8 }}>Blocks</div>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={PALETTE.map((_, i) => `palette-${i}`)} strategy={rectSortingStrategy}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {PALETTE.map((b, i) => (
                  <PaletteItem key={b.id} id={`palette-${i}`} label={b.label} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>

        {/* Workspace */}
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={workspace.map((w) => `workspace-${w.id}`)} strategy={rectSortingStrategy}>
            <div style={{ background: "#0b0b0b", padding: 12, borderRadius: 10, minHeight: 320 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 12, color: "#cbd5e1" }}>Workspace</div>
            <div style={{ fontFamily: "Fira Code, monospace", fontSize: 14 }}>{String(Math.floor(timer / 60)).padStart(2, "0")}:{String(timer % 60).padStart(2, "0")}</div>
          </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {workspace.length === 0 && <div style={{ color: "#6b6b6b" }}>Drag blocks here or click to add.</div>}
              {workspace.map((b, idx) => (
                <SortableWorkspaceItem key={b.id} id={`workspace-${b.id}`} label={b.label} onRemove={() => removeAt(idx)} />
              ))}
            </div>
          </SortableContext>
        </DndContext>

          <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
            <button onClick={() => setWorkspace([])} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.04)", color: "#9ca3af", padding: "8px 12px", borderRadius: 8 }}>Clear</button>
            <button onClick={runCode} style={{ background: "#00FF41", border: "none", color: "#06120a", padding: "8px 12px", borderRadius: 8, fontWeight: 700 }}>Run Code</button>
          </div>

          {message && (
            <div style={{ marginTop: 12, padding: 10, borderRadius: 8, background: success ? "rgba(0,255,65,0.08)" : "rgba(255,50,50,0.06)", color: success ? "#00FF41" : "#ff7b7b" }}>{message}</div>
          )}
        </div>

        {/* Right panel: cup animation */}
        <div style={{ background: "#0f0f0f", padding: 12, borderRadius: 10 }}>
          <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 8 }}>Coffee Preview</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 260 }}>
            <svg viewBox="0 0 200 200" width={200} height={200}>
              {/* cup outline */}
              <g transform="translate(40,20)">
                <rect x={0} y={0} width={120} height={140} rx={16} fill="none" stroke="#2d1b13" strokeWidth={3} />
                {/* liquid mask */}
                <clipPath id="cupClip">
                  <rect x={0} y={0} width={120} height={140} rx={16} />
                </clipPath>
                <rect x={0} y={140 - (fillPct / 100) * 140} width={120} height={(fillPct / 100) * 140} rx={16} fill="url(#grad)" clipPath="url(#cupClip)" />
                <defs>
                  <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#c8902a" />
                    <stop offset="100%" stopColor="#5a2a0a" />
                  </linearGradient>
                </defs>
                {/* steam */}
                <g transform="translate(40,-20)">
                  <path d="M10 40 C 10 20, 20 20, 20 0" stroke="#e0c8b0" strokeWidth={3} fill="none" opacity={0.3} />
                  <path d="M30 40 C 30 18, 40 18, 40 0" stroke="#e0c8b0" strokeWidth={2} fill="none" opacity={0.22} />
                </g>
              </g>
            </svg>
          </div>
          <div style={{ marginTop: 12, fontSize: 13, color: "#cbd5e1" }}>Progress: {fillPct}%</div>
        </div>
      </div>

      {/* Ready modal (when timer finishes) */}
      {isOrderReady && (
        <div style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 60 }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)" }} />
          <div style={{ position: "relative", background: "#0f0f0f", color: "#00FF41", padding: 28, borderRadius: 12, width: "min(520px,92vw)", textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 6 }}>🔔</div>
            <h2 className="playfair" style={{ fontSize: 22, fontWeight: 900 }}>Your Byte is Ready!</h2>
            <p style={{ color: "#cbd5e1", marginTop: 8 }}>Your order is done — pick it up at the counter.</p>
            <div style={{ marginTop: 16 }}>
              <button onClick={() => setIsOrderReady(false)} style={{ background: "transparent", color: "#9ca3af", border: "1px solid rgba(255,255,255,0.04)", padding: "8px 14px", borderRadius: 8 }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PaletteItem({ id, label }: { id: string; label: string }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: 10,
    borderRadius: 8,
    background: "linear-gradient(90deg,#151515,#1a1210)",
    border: "1px solid rgba(255,255,255,0.04)",
    cursor: "grab",
    opacity: isDragging ? 0.6 : 1,
  } as React.CSSProperties;
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div style={{ fontWeight: 700 }}>{label}</div>
    </div>
  );
}

function SortableWorkspaceItem({ id, label, onRemove }: { id: string; label: string; onRemove: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    background: "#141214",
    border: "1px solid rgba(255,255,255,0.03)",
    opacity: isDragging ? 0.8 : 1,
  } as React.CSSProperties;

  return (
    <motion.div layout ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div>{label}</div>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={onRemove} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.04)", color: "#cbd5e1", padding: "4px 8px", borderRadius: 6 }}>Remove</button>
      </div>
    </motion.div>
  );
}

