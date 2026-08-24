import { type ReactNode } from "react";
import { useRoute } from "wouter";
import { useRoom } from "@/lib/useRoom";
import { RoomBar, SortStage, OverviewBoard } from "@/components/game-parts";
import { CARDS, FRAMING, type Group } from "@shared/content";

export default function Game() {
  const [, params] = useRoute("/game/:roomCode");
  const roomCode = params?.roomCode ?? "";
  const room = useRoom(roomCode, "player");
  const { gameState, myId } = room;

  if (!gameState) {
    return (
      <div className="tg-loading">
        <div style={{ textAlign: "center" }}>
          <div className="tg-spin" />
          {room.error ? room.error : "Joining the session…"}
        </div>
      </div>
    );
  }

  const isController = myId === gameState.controllerId;
  const driver =
    gameState.players.find((p) => p.id === gameState.controllerId)?.name
    || (gameState.controllerId === gameState.facilitator?.id ? "The facilitator" : "Someone");

  const shell = (children: ReactNode) => (
    <div className="tg-app"><div className="tg-wrap">
      <RoomBar roleLabel="Player" roomCode={roomCode} onLeave={room.leave} onCopy={room.copyCode} />
      {children}
    </div></div>
  );

  // ---- Waiting ----
  if (gameState.phase === "waiting") {
    return shell(
      <>
        <div className="tg-framing">
          <span className="tg-eyebrow">You’re in</span>
          <p className="intro tg-serif">Hi {room.name} — you’re ready.</p>
          <p className="note">Your facilitator will begin the session in a moment.</p>
        </div>
        <div className="tg-section-label"><span className="tg-eyebrow">In the room</span></div>
        <div className="tg-roster">
          {gameState.players.map((p, i) => (
            <span key={p.id} className={`tg-pchip ${!p.isConnected ? "off" : ""}`}>
              <span className={`av v${i % 2}`}>{p.name.charAt(0).toUpperCase()}</span>{p.name}
            </span>
          ))}
        </div>
      </>
    );
  }

  const takeControlRow = (
    <div className="tg-controls"><div className="buttons">
      <button className="tg-btn" onClick={room.takeControl}>Take control</button>
    </div></div>
  );

  // ---- Sorting ----
  if (gameState.phase === "sorting") {
    const nextCard = CARDS.find((c) => !gameState.assignments.some((a) => a.cardId === c.id)) ?? null;
    return shell(
      <>
        <div className="tg-round-line"><span className="tg-eyebrow">Prioritize together</span></div>
        <h1 className="tg-topic" style={{ marginBottom: ".5rem" }}>{FRAMING.intro}</h1>
        <p className="tg-standing" style={{ marginBottom: "1rem" }}>
          {isController ? "You have the pen — sort the card for the group." : `${driver} is sorting. Take control when it’s your turn.`}
        </p>
        <SortStage card={nextCard} sorted={gameState.assignments.length} total={gameState.totalCards}
          onAssign={(g: Group) => nextCard && room.assign(nextCard.id, g)} readOnly={!isController} />
        {!isController && takeControlRow}
      </>
    );
  }

  // ---- Overview ----
  return shell(
    <>
      <div className="tg-round-line"><span className="tg-eyebrow">Your priorities</span></div>
      <h1 className="tg-topic" style={{ marginBottom: ".5rem" }}>Yes · Maybe · No</h1>
      <p className="tg-standing" style={{ marginBottom: "1.2rem" }}>
        {isController ? "Drag any card between the piles to adjust." : `${driver} is adjusting. Take control to move cards.`}
      </p>
      <OverviewBoard assignments={gameState.assignments} onMove={(cardId, g) => room.assign(cardId, g)} readOnly={!isController} />
      {!isController && takeControlRow}
    </>
  );
}
