import { createServer, Server } from 'http';
import * as express from 'express';

class MessageServer {
  
  private app: express.Application;
  private server: Server;

  private port = 8080;

  constructor() {
    this.app = express();
    this.server = createServer(this.app);

    this.startServer();
  }

  getApp(): express.Application {
    return this.app;
  }

  private startServer(): void {
    this.server.listen(this.port, () => {
      console.log(`The server is running in port ${this.port}`);
    });
  }
}

let app = new MessageServer().getApp();
export { app }
