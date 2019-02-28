import SocketIOClient from 'socket.io-client';

export default class MessageManager {

  private static instance: MessageManager;
  private socket: any;

  private constructor() {
    this.socket = SocketIOClient('ws://192.168.1.31:8080');
  }

  static getInstance(): MessageManager {
    if (!MessageManager.instance) {
      MessageManager.instance = new MessageManager();
    }
    return MessageManager.instance;
  }

}
