import { Observable, BehaviorSubject } from 'rxjs';
import { Message } from '../models/Message';
import Websocket from './Websocket';

import * as variables from '../../variables.json';

export default class MessageService {

  static getInstance(): MessageService {
    if (!MessageService.instance) {
      MessageService.instance = new MessageService();
    }
    return MessageService.instance;
  }

  private static instance: MessageService;

  public get messages(): Observable<Message[]> {
    return this._messages;
  }

  private _messages: Observable<Message[]> = new Observable<Message[]>();

  private api = `http://${variables.server}/api/messages`;
  private messagesSubject = new BehaviorSubject<Message[]>([]);

  private constructor() {
    this._messages = this.messagesSubject.asObservable();
    this.updateMessages();
    this.getMessages();
  }

  sendMessage(message: Message): void {
    Websocket.instance.socket.emit('message', message);
  }

  getMessages(): void {
    fetch(this.api)
    .then((res) => res.json())
    .then((res) => this.messagesSubject.next(res));
  }

  onMessage(): Observable<Message> {
    return new Observable<Message>((observer) => {
      Websocket.instance.socket.on('message', (data: Message) => observer.next(data));
    });
  }

  private updateMessages(): void {
    this.onMessage().subscribe((data: Message) => {
      const messages = this.messagesSubject.getValue();
      messages.push(data);

      this.messagesSubject.next(messages);
    });
  }
}
