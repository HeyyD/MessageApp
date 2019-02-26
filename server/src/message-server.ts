import { createServer, Server } from 'http';
import * as express from 'express';

export class MessageServer {
  private app: express.Application;
  private server: Server;

  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.server.listen(8080, () => {
      console.log('The server is running in port 8080');
    })
  }

  getApp(): express.Application {
    return this.app;
  }
}
