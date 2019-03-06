import * as express from 'express';

export class Users {
  private router = express.Router();

  constructor(app: express.Application) {
    this.router.get('/', (req: express.Request, res: express.Response) => {
      res.send({hello: 'Hello World'});
    });
    app.use('/api/users', this.router);
  }
}