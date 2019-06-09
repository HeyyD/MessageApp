import { YellowBox } from "react-native";
import SocketIOClient from 'socket.io-client';

import * as variables from '../../variables.json';

export default class Websocket {

  static get instance(): Websocket {
    if (!Websocket._instance) {
      Websocket._instance = new Websocket();
    }
    return Websocket._instance;
  }

  get socket(): SocketIOClient.Socket {
    return this._socket;
  }

  private static _instance: Websocket;
  private _socket: SocketIOClient.Socket;

  private constructor() {
    // tslint:disable-next-line: no-console
    console.ignoredYellowBox = ['Remote debugger'];
    YellowBox.ignoreWarnings([
      'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`,'
      + '`key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did'
      + ' you mean to put these under `headers`?',
    ]);

    this._socket = SocketIOClient(`ws://${variables.server}`);
  }
}
