import { User, UserModel } from "./models/user";

export class UserService {
  getUser(id: string): Promise<User> {
    return UserModel.findOne({deviceID: id}).exec();
  }

  createUser(user: User): Promise<User> {
    const userModel = new UserModel(user);
    return userModel.save().catch(err => {
      throw new Error(err);
    });
  }
}