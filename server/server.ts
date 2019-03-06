import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketio from 'socket.io';
import { Message } from './models/message';

class MessageServer {
  
  private app: express.Application;
  private server: Server;
  private websocket: socketio.Server;

  private address = '192.168.1.31';
  private port = 8080;

  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.websocket = socketio(this.server);

    this.startServer();
  }

  getApp(): express.Application {
    return this.app;
  }

  private startServer(): void {
    this.server.listen(this.port, () => {
      console.log(`The server is running in ${this.address}:${this.port}`);
    });

    this.websocket.on('connect', (socket) => {
      console.log(`Client connected: ${socket.id}`);

      socket.on('message', (message: Message) => {
        this.websocket.emit('message', message);
      });
    });
  }
}

const app = new MessageServer().getApp();
export { app };
