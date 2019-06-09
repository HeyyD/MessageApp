import { Router, Application, Request, Response } from "express";
import { MessageService } from "../messageService";

export const initMessagesController = (app: Application) => {
  const router = Router();
  const messageService = new MessageService();

  router.get('/', async (req: Request, res: Response) => {
    const messages = await messageService.getMessages();
    res.status(200).send(messages);
  });

  app.use('/api/messages', router);
};
