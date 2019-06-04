import * as express from 'express';
import * as bodyParser from 'body-parser';
import { User, UserModel } from '../models/user';
import { UserService } from '../userService';

export class Users {
  private router = express.Router();

  constructor(app: express.Application) {
    this.router.get('/:id', async (req: express.Request, res: express.Response) => {
      const user = await new UserService().getUser(req.params.id);
      if (!user) {
        res.status(404).send("Could not find user");
      } else {
        res.status(200).send(user);
      }
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