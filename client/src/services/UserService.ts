import { User } from "../models/User";

export default class UserService {
  static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  private static instance: UserService;

  private user?: User;

  private constructor() {}

  setUser(user: User): void {
    this.user = user;
  }

  getUser(): User {
    // There really shouldn't be any moment when we try to retreve the user
    // and it isn't initialized.
    return this.user!;
  }

}
