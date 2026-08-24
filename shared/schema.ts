import { z } from "zod";

export const seatSchema = z.object({
  id: z.string(),
  name: z.string(),
  isConnected: z.boolean(),
});
export type Seat = z.infer<typeof seatSchema>;

// One card's placement: which card, and which pile it's in.
export const assignmentSchema = z.object({
  cardId: z.string(),
  group: z.string(), // "yes" | "maybe" | "no"
});
export type Assignment = z.infer<typeof assignmentSchema>;

export type Phase = "waiting" | "sorting" | "overview";
export type Role = "facilitator" | "player";

export const gameStateSchema = z.object({
  roomCode: z.string(),
  phase: z.string() as z.ZodType<Phase>,
  facilitator: seatSchema.nullable(),
  players: z.array(seatSchema),
  controllerId: z.string(),      // who currently holds the pen (a player, or the facilitator)
  assignments: z.array(assignmentSchema),
  totalCards: z.number(),
  maxPlayers: z.number(),
});
export type GameState = z.infer<typeof gameStateSchema>;

export interface ServerToClientEvents {
  game_state: (state: GameState) => void;
  error: (message: string) => void;
}
export interface ClientToServerEvents {
  create_room: (name: string, callback: (roomCode: string) => void) => void;
  join_room: (
    roomCode: string,
    name: string,
    role: Role,
    callback: (success: boolean, error?: string) => void
  ) => void;
  start: () => void;                                // facilitator begins
  take_control: () => void;                         // grab the pen (any player or the facilitator)
  assign: (cardId: string, group: string) => void;  // the current driver sorts / re-sorts a card
  restart: () => void;                              // facilitator runs it again
}
