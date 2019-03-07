import * as express from 'express';
import * as bodyParser from 'body-parser';
import { User, UserModel } from '../models/user';

export class Users {
  private router = express.Router();

  constructor(app: express.Application) {
    this.router.get('/:id', (req: express.Request, res: express.Response) => {
      console.log(req.params.id);
      res.status(200).send(req.params.id);
    });

    this.router.post('/', (req: express.Request, res: express.Response) => {
      // const data = req.body as User;
      const user = {
        username: 'TestUser',
        deviceID: 'id123'
      };

      const userModel = new UserModel(user);
      userModel.save().then(() => {
        res.status(200).send('User created');
      }).catch((error) => {
        res.send(500).send(error);
      });
    });

    app.use(bodyParser.json());
    app.use('/api/users', this.router);
  }
}