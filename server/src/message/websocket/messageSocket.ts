import { Socket, Server } from "socket.io";
import { Message } from "../models/message";

export const listenMessages = (io: Server,socket: Socket) => {
  socket.on('message', (message: Message) => {
    console.log(message);
    io.emit('message', message);
  });
};

