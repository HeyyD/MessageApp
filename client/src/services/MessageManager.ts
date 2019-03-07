import { YellowBox } from 'react-native';
import SocketIOClient from 'socket.io-client';
import { Observable } from 'rxjs';
import { Message } from '../models/Message';
import { User } from '../models/User';

export default class MessageManager {

  private static instance: MessageManager;
  private socket: SocketIOClient.Socket;
  private user?: User;

  private constructor() {
    console.ignoredYellowBox = ['Remote debugger'];
    YellowBox.ignoreWarnings([
      'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
    ]);

    this.socket = SocketIOClient('ws://192.168.1.31:8080');
  }

  sendMessage(message: Message): void {
    this.socket.emit('message', message);
  }

  onMessage(): Observable<Message> {
    return new Observable<Message>(observer => {
      this.socket.on('message', (data: Message) => observer.next(data));
    });
  }

  setUser(user: User): void {
    this.user = user;
  }

  getUser(): User {
    // There really shouldn't be any moment when we try to retreve the user
    // and it isn't initialized.
    return this.user!;
  }

  static getInstance(): MessageManager {
    if (!MessageManager.instance) {
      MessageManager.instance = new MessageManager();
    }
    return MessageManager.instance;
  }

}
