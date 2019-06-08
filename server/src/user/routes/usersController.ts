import * as express from 'express';
import * as bodyParser from 'body-parser';
import { User, UserModel } from '../models/user';
import { UserService } from '../userService';

export class UsersController {

  private router = express.Router();
  private userService = new UserService();

  constructor(app: express.Application) {
    this.router.get('/:id', async (req: express.Request, res: express.Response) => {
      const user = await this.userService.getUser(req.params.id);
      if (!user) {
        res.status(404).send("Could not find user");
      } else {
        res.status(200).send(user);
      }
    });

    this.router.post('/', async (req: express.Request, res: express.Response) => {
      const user = req.body as User;
      
      try {
        const created = await this.userService.createUser(user);
        res.status(200).send(created);
      } catch(err) {
        res.status(500).send(err);
      }
    });

    app.use(bodyParser.json());
    app.use('/api/users', this.router);
  }
}