import { Server } from "socket.io";
import { listenMessages } from "../message/websocket/messageSocket";

export const connectionStore = new Map<string, string>();

export const initConnections = (io: Server) => {
  io.on('connect', (socket) => {
    console.log(`Client connected: ${socket.id}`);
    connectionStore.set(socket.handshake.query.user, socket.id);

    listenMessages(io, socket);
  
    socket.on('disconnect', () => {
      connectionStore.delete(socket.handshake.query.user);
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
};

