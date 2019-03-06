import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketio from 'socket.io';
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { Message } from './models/message';

class MessageServer {

  static getInstance(): MessageServer {
    if (MessageServer.instance === null) {
      MessageServer.instance = new MessageServer();
    }
    return MessageServer.instance;
  }

  private static instance: MessageServer = null;
  private app: express.Application;
  private server: Server;
  private websocket: socketio.Server;

  private address = '192.168.1.31';
  private port = 8080;

  private constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.websocket = socketio(this.server);
    dotenv.config();

    this.startServer();
  }

  getApp(): express.Application {
    return this.app;
  }

  private startServer(): void {

    mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true }).then(() => {
      console.log('Connected to database!');
    }).catch((error: any) => {
      console.log(error);
    });

    this.server.listen(this.port, () => {
      console.log(`The server is running in ${this.address}:${this.port}`);
    });

    this.websocket.on('connect', (socket) => {
      console.log(`Client connected: ${socket.id}`);

      socket.on('message', (message: Message) => {
        this.websocket.emit('message', message);
      });
    });

    this.server.on('close', () => {
      mongoose.connection.close();
    });
  }
}

const app = MessageServer.getInstance().getApp();
export { app };
