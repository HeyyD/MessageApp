import { MessageServer } from './src/message-server';

let app = new MessageServer().getApp();

export { app };
