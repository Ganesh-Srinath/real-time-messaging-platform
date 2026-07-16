import { Server } from "socket.io";
import { registerSocketHandlers } from "./socketHandler.js";
import { socketAuthMiddleware } from "./socketMiddleware.js";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.use(socketAuthMiddleware);

  registerSocketHandlers(io);
};

export const getIO = () => io;