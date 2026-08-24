import type { Express } from "express";
import { createServer, type Server } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import { storage } from "./storage";
import type { ServerToClientEvents, ClientToServerEvents, Role } from "@shared/schema";

type TypedServer = SocketIOServer<ClientToServerEvents, ServerToClientEvents>;
type TypedSocket = Socket<ClientToServerEvents, ServerToClientEvents>;

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);
  const io: TypedServer = new SocketIOServer(httpServer, {
    cors: { origin: "*", methods: ["GET", "POST"] },
    pingInterval: 25000,
    pingTimeout: 120000,
  });

  function emit(roomCode: string): void {
    const state = storage.getRoom(roomCode);
    if (state) io.to(roomCode).emit("game_state", state);
  }

  io.on("connection", (socket: TypedSocket) => {
    socket.on("create_room", (name, cb) => {
      try {
        const roomCode = storage.createRoom(socket.id, name.trim() || "Facilitator");
        socket.join(roomCode);
        cb(roomCode);
        emit(roomCode);
      } catch (e) {
        console.error("create_room", e);
        socket.emit("error", "Failed to create room");
      }
    });

    socket.on("join_room", (roomCode, name, role: Role, cb) => {
      try {
        const room = storage.getRoom(roomCode);
        if (!room) return cb(false, "Room not found");
        socket.join(roomCode);
        const res =
          role === "facilitator"
            ? storage.joinFacilitator(roomCode, socket.id, name.trim() || "Facilitator")
            : storage.addOrReconnectPlayer(roomCode, socket.id, name.trim());
        if (!res.ok) {
          socket.leave(roomCode);
          if (res.reason === "not_found") return cb(false, "Room not found");
          if (res.reason === "full") return cb(false, "This session is full (up to 5 players).");
          if (res.reason === "not_waiting") return cb(false, "The session has already started.");
          if (res.reason === "duplicate_name") return cb(false, "That name is already taken — please pick another.");
          return cb(false, "Unable to join the session.");
        }
        cb(true);
        emit(roomCode);
      } catch (e) {
        console.error("join_room", e);
        cb(false, "An error occurred while joining the session");
      }
    });

    const withRoom = (fn: (roomCode: string) => boolean) => {
      const room = storage.getRoomByAnyId(socket.id);
      if (room && fn(room.roomCode)) emit(room.roomCode);
    };

    socket.on("start", () => withRoom((c) => storage.start(c, socket.id)));
    socket.on("take_control", () => withRoom((c) => storage.takeControl(c, socket.id)));
    socket.on("assign", (cardId, group) => withRoom((c) => storage.assign(c, socket.id, cardId, group)));
    socket.on("restart", () => withRoom((c) => storage.restart(c, socket.id)));

    socket.on("disconnect", () => {
      try {
        const room = storage.setConnected(socket.id, false);
        if (room) emit(room.roomCode);
      } catch (e) {
        console.error("disconnect", e);
      }
    });
  });

  return httpServer;
}
