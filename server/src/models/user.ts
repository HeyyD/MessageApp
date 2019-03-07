import * as mongoose from 'mongoose';

export interface User extends mongoose.Document {
  username: string;
  deviceID: string;
}

const schema = new mongoose.Schema({
  username: String,
  deviceID: String
});

export const UserModel = mongoose.model<User>('UserModel', schema);
