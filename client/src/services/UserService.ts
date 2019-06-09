import { User } from "../models/User";
import DeviceInfo from 'react-native-device-info';

import * as variables from '../../variables.json';

export default class UserService {
  static get instance(): UserService {
    if (!UserService._instance) {
      UserService._instance = new UserService();
    }
    return UserService._instance;
  }

  private static _instance: UserService;

  public get users(): User[] {
    return this._users;
  }

  public get user(): User {
    return this._user!;
  }

  public set user(user: User) {
    this._user = user;
  }

  private _user?: User;
  private _users: User[] = [];

  private api: string = `http://${variables.server}/api/users/`;

  private constructor() {
    this.fetchUsers();
  }

  register(username: string, onSucces: () => void): void {
    const id = DeviceInfo.getUniqueID();
    fetch(this.api, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        username,
        deviceID: id,
      }),
    }).then((res) => {
      if (res.status === 200) {
        onSucces();
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
  }

  private fetchUsers(): void {
    fetch(this.api)
    .then((res) => res.json())
    .then((res) => this._users = res);
  }

}
