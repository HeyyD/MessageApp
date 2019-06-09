import { User } from '../models/user';
import { UserService } from '../userService';
import { Application, Router, Request, Response } from 'express';

export const initUsersController = (app: Application) => {
  const router = Router();
  const userService = new UserService();

  router.get('/', async (req: Request, res: Response) => {
    const users = await userService.getUsers();
    if (!users) {
      res.status(404).send(users);
    } else {
      res.status(200).send(users);
    }
  });

  router.get('/:id', async (req: Request, res: Response) => {
    const user = await userService.getUser(req.params.id);
    if (!user) {
      res.status(404).send("Could not find user");
    } else {
      res.status(200).send(user);
    }
  });

  router.post('/', async (req: Request, res: Response) => {
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
