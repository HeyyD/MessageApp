import { User } from "../models/User";
import DeviceInfo from 'react-native-device-info';

import * as variables from '../../variables.json';

export default class UserService {
  static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  private static instance: UserService;

  private user?: User;
  private api: string = `http://${variables.server}/api/users/`;

  private constructor() {}

  setUser(user: User): void {
    this.user = user;
  }

  getCurrentUser(): User {
    // There really shouldn't be any moment when we try to retreve the user
    // and it isn't initialized.
    return this.user!;
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

}
