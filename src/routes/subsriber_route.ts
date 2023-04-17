import express, { Request, Response } from 'express';
import { SubscriberController } from '../controllers';
import debug from 'debug';
import { IWebhookRequest } from './../custom/dto/webhook_request';

const app = express.Router();
const controller = new SubscriberController();

app.get('/', async function (request: Request, response: Response) {
  const data = await controller.get();
  response.status(200).json({ message: 'Data found.', data: data });
});

app.post('/', async function (request: Request, response: Response) {
  const data = await controller.post(request.body);

  if (data) {
    response.status(200).json({ message: 'Data created.', data: data });
  } else {
    response.status(500).json({ message: 'Failed to create data' });
  }
});

app.post('/notify', async function (request: Request, response: Response) {
  const success = await controller.notifyTelegram(request.body);

  if (success) {
    response.status(200).json({ message: 'Users notified' });
  } else {
    response.status(500).json({ message: 'Failed to notify users.' });
  }
});

app.post('/register', async function (request: Request, response: Response) {
  const body = request.body as IWebhookRequest;
  const data = await controller.register(body);
  response.status(200).json(data);
});

export default app;
