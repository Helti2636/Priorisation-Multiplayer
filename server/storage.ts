import type { GameState } from "@shared/schema";
import { CARDS, CARD_BY_ID, GROUPS } from "@shared/content";

const MAX_PLAYERS = 5;
const MIN_PLAYERS = 2;

export function generateRoomCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
  return code;
}

type JoinResult =
  | { ok: true; action: "joined" | "reconnected" | "already_member" }
  | { ok: false; reason: "not_found" | "full" | "not_waiting" | "duplicate_name" };

export class MemStorage {
  private rooms: Map<string, GameState> = new Map();

  createRoom(facilitatorId: string, facilitatorName: string): string {
    const roomCode = generateRoomCode();
    this.rooms.set(roomCode, {
      roomCode,
      phase: "waiting",
      facilitator: { id: facilitatorId, name: facilitatorName, isConnected: true },
      players: [],
      controllerId: "",
      assignments: [],
      totalCards: CARDS.length,
      maxPlayers: MAX_PLAYERS,
    });
    return roomCode;
  }

  getRoom(roomCode: string): GameState | undefined {
    return this.rooms.get(roomCode);
  }

  joinFacilitator(roomCode: string, socketId: string, name: string): JoinResult {
    const room = this.rooms.get(roomCode);
    if (!room) return { ok: false, reason: "not_found" };
    const oldId = room.facilitator?.id;
    if (oldId && room.controllerId === oldId) room.controllerId = socketId; // keep the pen after a reconnect
    room.facilitator = { id: socketId, name, isConnected: true };
    return { ok: true, action: oldId ? "reconnected" : "joined" };
  }

  addOrReconnectPlayer(roomCode: string, socketId: string, name: string): JoinResult {
    const room = this.rooms.get(roomCode);
    if (!room) return { ok: false, reason: "not_found" };
    const byId = room.players.find((p) => p.id === socketId);
    if (byId) { byId.isConnected = true; return { ok: true, action: "already_member" }; }
    const byName = room.players.find((p) => p.name === name);
    if (byName) {
      if (byName.isConnected && room.phase === "waiting") return { ok: false, reason: "duplicate_name" };
      if (room.controllerId === byName.id) room.controllerId = socketId; // keep the pen after a reconnect
      byName.id = socketId;
      byName.isConnected = true;
      return { ok: true, action: "reconnected" };
    }
    if (room.players.length >= room.maxPlayers) return { ok: false, reason: "full" };
    if (room.phase !== "waiting") return { ok: false, reason: "not_waiting" };
    room.players.push({ id: socketId, name, isConnected: true });
    return { ok: true, action: "joined" };
  }

  getRoomByPlayerId(id: string): GameState | undefined {
    return Array.from(this.rooms.values()).find((r) => r.players.some((p) => p.id === id));
  }
  getRoomByAnyId(id: string): GameState | undefined {
    return Array.from(this.rooms.values()).find(
      (r) => r.facilitator?.id === id || r.players.some((p) => p.id === id)
    );
  }

  isFacilitator(room: GameState, id: string): boolean {
    return room.facilitator?.id === id;
  }

  setConnected(id: string, isConnected: boolean): GameState | undefined {
    const room = this.getRoomByAnyId(id);
    if (!room) return undefined;
    if (room.facilitator?.id === id) room.facilitator.isConnected = isConnected;
    const p = room.players.find((pl) => pl.id === id);
    if (p) p.isConnected = isConnected;
    return room;
  }

  private firstPlayerId(room: GameState): string {
    return room.players.find((p) => p.isConnected)?.id ?? room.facilitator?.id ?? "";
  }

  start(roomCode: string, byId: string): boolean {
    const room = this.rooms.get(roomCode);
    if (!room || !this.isFacilitator(room, byId) || room.phase !== "waiting") return false;
    if (room.players.filter((p) => p.isConnected).length < MIN_PLAYERS) return false;
    room.phase = "sorting";
    room.assignments = [];
    room.controllerId = this.firstPlayerId(room);
    return true;
  }

  /** During sorting / overview: grab the pen (any player or the facilitator). */
  takeControl(roomCode: string, id: string): boolean {
    const room = this.rooms.get(roomCode);
    if (!room || (room.phase !== "sorting" && room.phase !== "overview")) return false;
    const isMember = room.facilitator?.id === id || room.players.some((p) => p.id === id);
    if (!isMember) return false;
    room.controllerId = id;
    return true;
  }

  /** The current driver places (or moves) a card into a pile. */
  assign(roomCode: string, byId: string, cardId: string, group: string): boolean {
    const room = this.rooms.get(roomCode);
    if (!room || (room.phase !== "sorting" && room.phase !== "overview")) return false;
    const controller = room.controllerId || this.firstPlayerId(room);
    if (byId !== controller) return false;
    if (!CARD_BY_ID[cardId] || !(GROUPS as readonly string[]).includes(group)) return false;

    const existing = room.assignments.find((a) => a.cardId === cardId);
    if (existing) existing.group = group;
    else room.assignments.push({ cardId, group });

    if (room.phase === "sorting" && room.assignments.length >= room.totalCards) {
      room.phase = "overview";
    }
    return true;
  }

  restart(roomCode: string, byId: string): boolean {
    const room = this.rooms.get(roomCode);
    if (!room || !this.isFacilitator(room, byId)) return false;
    room.phase = "sorting";
    room.assignments = [];
    room.controllerId = this.firstPlayerId(room);
    return true;
  }
}

export const storage = new MemStorage();
