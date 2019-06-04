import { User, UserModel } from "./models/user";

export class UserService {
  getUser(id: string): Promise<User> {
    return UserModel.findOne({deviceID: id}).exec();
  }
}