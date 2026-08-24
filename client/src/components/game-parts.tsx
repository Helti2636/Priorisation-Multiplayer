import { ArrowLeft, Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Assignment } from "@shared/schema";
import { CARD_BY_ID, GROUPS, GROUP_LABEL, type Group, type PriorityCard } from "@shared/content";

export function RoomBar({
  roleLabel, roomCode, onLeave, onCopy,
}: {
  roleLabel: string; roomCode: string; onLeave: () => void; onCopy: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const copy = () => { onCopy(); setCopied(true); setTimeout(() => setCopied(false), 1600); };
  return (
    <div className="tg-bar">
      <div style={{ display: "flex", alignItems: "center", gap: ".7rem" }}>
        <button className="tg-btn ghost" onClick={onLeave} aria-label="Leave session" style={{ padding: ".5rem .6rem" }}>
          <ArrowLeft size={16} />
        </button>
        <div>
          <div className="brand">Prioritization</div>
          <div className="role">{roleLabel}</div>
        </div>
      </div>
      <div className="tg-bar-right">
        <button className="tg-code" onClick={copy} title="Copy room code">
          <small>Room</small> {roomCode} {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>
    </div>
  );
}

/** A service card in the warm "paper" style. */
export function CardTile({ name, dragging, small, onPointerDown }: {
  name: string; dragging?: boolean; small?: boolean; onPointerDown?: (e: React.PointerEvent) => void;
}) {
  return (
    <div className={`pr-card ${dragging ? "is-dragging" : ""} ${small ? "small" : ""}`} onPointerDown={onPointerDown}>
      <span className="pr-card-name">{name}</span>
    </div>
  );
}

/** Sorting stage: drag the current card into Yes / Maybe / No (clicking a pile also works). */
export function SortStage({ card, sorted, total, onAssign, readOnly = false }: {
  card: PriorityCard | null; sorted: number; total: number; onAssign: (group: Group) => void; readOnly?: boolean;
}) {
  const [drag, setDrag] = useState<{ x: number; y: number } | null>(null);
  const zoneRefs = useRef<Record<Group, HTMLDivElement | null>>({ yes: null, maybe: null, no: null });

  useEffect(() => {
    if (!drag) return;
    const move = (e: PointerEvent) => setDrag((d) => (d ? { x: e.clientX, y: e.clientY } : d));
    const up = (e: PointerEvent) => {
      for (const g of GROUPS) {
        const r = zoneRefs.current[g]?.getBoundingClientRect();
        if (r && e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) { onAssign(g); break; }
      }
      setDrag(null);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); };
  }, [drag, onAssign]);

  const start = (e: React.PointerEvent) => { if (readOnly || !card) return; e.preventDefault(); setDrag({ x: e.clientX, y: e.clientY }); };

  return (
    <div className="pr-stage">
      <p className="pr-progress">{sorted} of {total} sorted</p>
      <div className="pr-current">
        {card ? <CardTile name={card.name} dragging={!!drag} onPointerDown={start} /> : <p className="tg-standing">All cards sorted.</p>}
      </div>
      <div className="pr-zones">
        {GROUPS.map((g) => (
          <div key={g} ref={(el) => (zoneRefs.current[g] = el)}
            className={`pr-zone ${g} ${drag ? "armed" : ""}`}
            onClick={() => !readOnly && card && onAssign(g)}>
            <span className="pr-zone-label">{GROUP_LABEL[g]}</span>
          </div>
        ))}
      </div>
      {drag && card && (
        <div className="pr-ghost" style={{ left: drag.x, top: drag.y }}><CardTile name={card.name} /></div>
      )}
    </div>
  );
}

/** Overview: three piles; drag a card from one pile to another to re-sort it. */
export function OverviewBoard({ assignments, onMove, readOnly = false }: {
  assignments: Assignment[]; onMove: (cardId: string, group: Group) => void; readOnly?: boolean;
}) {
  const [drag, setDrag] = useState<{ cardId: string; x: number; y: number } | null>(null);
  const colRefs = useRef<Record<Group, HTMLDivElement | null>>({ yes: null, maybe: null, no: null });

  useEffect(() => {
    if (!drag) return;
    const move = (e: PointerEvent) => setDrag((d) => (d ? { ...d, x: e.clientX, y: e.clientY } : d));
    const up = (e: PointerEvent) => {
      for (const g of GROUPS) {
        const r = colRefs.current[g]?.getBoundingClientRect();
        if (r && e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) { onMove(drag.cardId, g); break; }
      }
      setDrag(null);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); };
  }, [drag, onMove]);

  const start = (cardId: string) => (e: React.PointerEvent) => { if (readOnly) return; e.preventDefault(); setDrag({ cardId, x: e.clientX, y: e.clientY }); };
  const cardsIn = (g: Group) => assignments.filter((a) => a.group === g);

  return (
    <div className={`pr-overview ${readOnly ? "readonly" : ""}`}>
      {GROUPS.map((g) => (
        <div key={g} ref={(el) => (colRefs.current[g] = el)} className={`pr-col ${g} ${drag ? "armed" : ""}`}>
          <div className="pr-col-head"><span>{GROUP_LABEL[g]}</span><span className="pr-col-count">{cardsIn(g).length}</span></div>
          <div className="pr-col-cards">
            {cardsIn(g).map((a) => (
              <CardTile key={a.cardId} name={CARD_BY_ID[a.cardId]?.name ?? a.cardId} small dragging={drag?.cardId === a.cardId} onPointerDown={start(a.cardId)} />
            ))}
            {cardsIn(g).length === 0 && <p className="pr-col-empty">—</p>}
          </div>
        </div>
      ))}
      {drag && (
        <div className="pr-ghost" style={{ left: drag.x, top: drag.y }}>
          <CardTile name={CARD_BY_ID[drag.cardId]?.name ?? drag.cardId} small />
        </div>
      )}
    </div>
  );
}
