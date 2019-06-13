import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketio from 'socket.io';
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import { initUsersController } from './src/user/routes/usersController';
import { initMessagesController } from './src/message/routes/messagesController';
import { initConnections } from './src/connection/connectionSocket';

class MessageServer {
  
  private app: express.Application;
  private server: Server;
  private io: socketio.Server;

  private address = '192.168.1.31';
  private port = 8080;

  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.io = socketio(this.server);

    this.app.use(bodyParser.json());
    
    initUsersController(this.app);
    initMessagesController(this.app);

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

    initConnections(this.io);

    this.server.on('close', () => {
      mongoose.connection.close();
    });
  }
}

const app = new MessageServer().getApp();
export { app };
