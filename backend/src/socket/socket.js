import { Server } from "socket.io";
import { registerSocketHandlers } from "./socketHandler.js";
import { socketAuthMiddleware } from "./socketMiddleware.js";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.use(socketAuthMiddleware);

  registerSocketHandlers(io);
};

export const getIO = () => io;