import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Message } from '../models/Message';
import Websocket from './Websocket';

import * as variables from '../../variables.json';
import UserService from './UserService';

export default class MessageService {

  static  get instance(): MessageService {
    if (!MessageService._instance) {
      MessageService._instance = new MessageService();
    }
    return MessageService._instance;
  }

  private static _instance: MessageService;

  public get messages(): Observable<Message[]> {
    return this._messages;
  }

  public get message(): Observable<Message> {
    return this._message;
  }

  public get currentChat(): string {
    return this._currentChat;
  }

  public set currentChat(chat: string) {
    this._currentChat = chat;
  }

  public get isLoading(): Observable<boolean> {
    return this._isLoading;
  }

  private _messages: Observable<Message[]> = new Observable<Message[]>();
  private _message: Observable<Message> = new Observable<Message>();

  private api = `http://${variables.server}/api/messages`;

  private messagesSubject = new BehaviorSubject<Message[]>([]);
  private messageSubject = new Subject<Message>();

  private _currentChat: string = '';

  private _isLoading = new Observable<boolean>();
  private isLoadingSubject = new BehaviorSubject(false);

  private constructor() {
    this._messages = this.messagesSubject.asObservable();
    this._message = this.messageSubject.asObservable();

    this._isLoading = this.isLoadingSubject.asObservable();

    this.updateMessages();

    Websocket.instance.socket.on('message', (data: Message) => {
      this.messageSubject.next(data);
    });
  }

  sendMessage(message: Message): void {
    Websocket.instance.socket.emit('message', message);
  }

  getMessages(senderId: string, receiverId: string): void {
    this.isLoadingSubject.next(true);
    fetch(`${this.api}/${senderId}/${receiverId}`)
    .then((res) => res.json())
    .then((res) => {
      this.messagesSubject.next(res);
      this.isLoadingSubject.next(false);
    });
  }

  private updateMessages(): void {
    this.message.subscribe((data: Message) => {
      if (
        (data.sender.deviceID === this.currentChat && data.receiver.deviceID === UserService.instance.user.deviceID) ||
        (data.receiver.deviceID === this.currentChat && data.sender.deviceID === UserService.instance.user.deviceID)
        ) {
        const messages = this.messagesSubject.getValue();
        messages.push(data);

        this.messagesSubject.next(messages);
      }
    });
  }
}
