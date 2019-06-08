import { Observable } from 'rxjs';
import { Message } from '../models/Message';
import { User } from '../models/User';
import Websocket from './Websocket';

export default class MessageService {

  static getInstance(): MessageService {
    if (!MessageService.instance) {
      MessageService.instance = new MessageService();
    }
    return MessageService.instance;
  }

  private static instance: MessageService;
  private user?: User;

  sendMessage(message: Message): void {
    Websocket.getInstance().getSocket().emit('message', message);
  }

  onMessage(): Observable<Message> {
    return new Observable<Message>((observer) => {
      Websocket.getInstance().getSocket().on('message', (data: Message) => observer.next(data));
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
}
