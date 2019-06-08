import { Message, MessageModel } from "./models/message";

export class MessageService {
  saveMessage(message: Message): Promise<Message> {
    const messageModel = new MessageModel(message);
    return messageModel.save().catch(err => {
      throw new Error(err);
    });
  }
}