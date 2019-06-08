import { User, UserModel } from "../../user/models/user";
import { Schema, model, Document } from "mongoose";

export interface Message extends Document {
  user: User;
  text: string;
}

const schema = new Schema({
  user: UserModel,
  text: String
});

export const MessageModel = model<Message>('MessageModel', schema);