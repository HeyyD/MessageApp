import { Socket, Server } from "socket.io";
import { Message } from "../models/message";
import { MessageService } from "../messageService";

export const listenMessages = (io: Server,socket: Socket) => {
  socket.on('message', async (message: Message) => {
    const service = new MessageService();
    try {
      const mess = await service.saveMessage(message);
      io.emit('message', mess);
    } catch(error) {
      io.emit('error', error);
    }
  });
};

