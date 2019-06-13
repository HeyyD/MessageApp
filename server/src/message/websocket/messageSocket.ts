import { Socket, Server } from "socket.io";
import { Message } from "../models/message";
import { MessageService } from "../messageService";
import { connectionStore } from "../../connection/connectionSocket";

export const listenMessages = (io: Server,socket: Socket) => {
  socket.on('message', async (message: Message) => {
    const service = new MessageService();
    try {
      const mess = await service.saveMessage(message);
      const receiver = connectionStore.get(mess.receiver.deviceID);
      
      if (receiver) {
        io.to(receiver).emit('message', mess);
      }
      io.to(socket.id).emit('message', mess);
    } catch(error) {
      io.emit('error', error);
    }
  });
};
