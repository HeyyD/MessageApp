import * as express from 'express';
import * as bodyParser from 'body-parser';
import { User } from '../models/user';

export class Users {
  private router = express.Router();

  constructor(app: express.Application) {
    this.router.get('/', (req: express.Request, res: express.Response) => {
      res.send({hello: 'Hello World'});
    });

    this.router.post('/', (req: express.Request, res: express.Response) => {
      const data = req.body as User;
      res.send(data);
    });

    app.use(bodyParser.json());
    app.use('/api/users', this.router);
  }
}