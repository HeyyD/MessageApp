import { YellowBox } from 'react-native';
import SocketIOClient from 'socket.io-client';

export default class MessageManager {

  private static instance: MessageManager;
  private socket: SocketIOClient.Socket;

  private constructor() {
    console.ignoredYellowBox = ['Remote debugger'];
    YellowBox.ignoreWarnings([
      'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
    ]);

    this.socket = SocketIOClient('ws://192.168.1.31:8080');
  }

  static getInstance(): MessageManager {
    if (!MessageManager.instance) {
      MessageManager.instance = new MessageManager();
    }
    return MessageManager.instance;
  }

}
