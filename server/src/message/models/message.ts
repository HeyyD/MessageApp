import { User } from "../../user/models/user";
import { Schema, model, Document } from "mongoose";

export interface Message extends Document {
  sender: User;
  receiver: User;
  text: string;
  created_ts: Date;
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
  text: String,
  created_ts: {
    type: Date,
    default: Date.now
  }
});

export const MessageModel = model<Message>('MessageModel', schema);