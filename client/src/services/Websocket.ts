import { YellowBox } from "react-native";
import SocketIOClient from 'socket.io-client';

import * as variables from '../../variables.json';

export default class Websocket {

  static getInstance(): Websocket {
    if (!Websocket.instance) {
      Websocket.instance = new Websocket();
    }
    return Websocket.instance;
  }

  private static instance: Websocket;
  private socket: SocketIOClient.Socket;

  private constructor() {
    // tslint:disable-next-line: no-console
    console.ignoredYellowBox = ['Remote debugger'];
    YellowBox.ignoreWarnings([
      'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`,'
      + '`key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did'
      + ' you mean to put these under `headers`?',
    ]);

    this.socket = SocketIOClient(`ws://${variables.server}`);
  }

  getSocket(): SocketIOClient.Socket {
    return this.socket;
  }
}
