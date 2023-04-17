import express, { Request, Response } from 'express';
import { SubscriberController } from '../controllers';

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

export default app;
