import { Router, Application, Request, Response } from "express";
import { MessageService } from "../messageService";

export const initMessagesController = (app: Application) => {
  const router = Router();
  const messageService = new MessageService();

  router.get('/', async (req: Request, res: Response) => {
    const messages = await messageService.getMessages();
    res.status(200).send(messages);
  });

  router.get('/:sender/:receiver', async (req: Request, res: Response) => {
    const messages = await messageService.getMessagesForChat(req.params.sender, req.params.receiver);

    if (messages) {
      res.status(200).send(messages);
    } else {
      res.status(204).send([]);
    }
  });

  app.use('/api/messages', router);
};
