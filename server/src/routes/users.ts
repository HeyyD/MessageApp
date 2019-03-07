import * as express from 'express';
import * as bodyParser from 'body-parser';
import { User } from '../models/user';

export class Users {
  private router = express.Router();

  constructor(app: express.Application) {
    this.router.get('/:id', (req: express.Request, res: express.Response) => {
      console.log(req.params.id);
      res.status(200).send(req.params.id);
    });

    this.router.post('/', (req: express.Request, res: express.Response) => {
      const data = req.body as User;
      res.send(data);
    });

    app.use(bodyParser.json());
    app.use('/api/users', this.router);
  }
}