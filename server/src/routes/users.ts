import * as express from 'express';
import * as bodyParser from 'body-parser';
import { User, UserModel } from '../models/user';

export class Users {
  private router = express.Router();

  constructor(app: express.Application) {
    this.router.get('/:id', (req: express.Request, res: express.Response) => {
      UserModel.findOne({ deviceID: req.params.id }, (error: any, user: User) => {
        if (error) { console.log(error); }

        if (!user) {
          res.sendStatus(404);
        } else {
          res.status(200).send(user);
        }
      });
    });

    this.router.post('/', (req: express.Request, res: express.Response) => {
      const user = req.body as User;
      
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