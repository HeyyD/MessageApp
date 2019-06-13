import { Schema, model, Document } from "mongoose";

export interface User extends Document {
  username: string;
  deviceID: string;
}

const schema = new Schema({
  username: String,
  deviceID: String
});

export const UserModel = model<User>('UserModel', schema);
