import * as express from 'express';
import { User } from '../models/user';
import { UserService } from '../userService';

export const initUsersController = (app: express.Application) => {
  const router = express.Router();
  const userService = new UserService();

  router.get('/:id', async (req: express.Request, res: express.Response) => {
    const user = await userService.getUser(req.params.id);
    if (!user) {
      res.status(404).send("Could not find user");
    } else {
      res.status(200).send(user);
    }
  });

  router.post('/', async (req: express.Request, res: express.Response) => {
    const user = req.body as User;
    
    try {
      const created = await userService.createUser(user);
      res.status(200).send(created);
    } catch(err) {
      res.status(500).send(err);
    }
  });

  app.use('/api/users', router);
};
