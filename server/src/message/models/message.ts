import { User, UserModel } from "../../user/models/user";
import { Schema, model, Document } from "mongoose";

export interface Message extends Document {
  sender: User;
  receiver: User;
  text: string;
}

const schema = new Schema({
  sender: {
    username: String,
    deviceID: String
  },
  receiver: {
    username: String,
    deviceID: String
  },
  text: String
});

export const MessageModel = model<Message>('MessageModel', schema);