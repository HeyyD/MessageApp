import { Message, MessageModel } from "./models/message";

export class MessageService {
  saveMessage(message: Message): Promise<Message> {
    const messageModel = new MessageModel(message);
    return messageModel.save().catch(err => {
      throw new Error(err);
    });
  }

  getMessages(): Promise<Message[]> {
    return MessageModel.find().exec();
  }

  getMessagesForChat(sender: string, receiver: string): Promise<Message[]> {
    return Promise.all([
      MessageModel.find({'sender.deviceID': sender, 'receiver.deviceID': receiver}),
      MessageModel.find({'sender.deviceID': receiver, 'receiver.deviceID': sender})
    ])
    .then(res => {
      let messages = [...res[0], ...res[1]];
      messages = messages.sort((a, b) => {
        return a.created_ts > b.created_ts ? 1 : a.created_ts < b.created_ts ? -1 : 0;
      });
      return messages;
    });
  }
}