import express, { Request, Response } from 'express';
import { NotifyController } from '../controllers';

const app = express.Router();
const controller = new NotifyController();

app.post('/', async function (request: Request, response: Response) {
  await controller.post(request.body);
  response.status(200).json({ message: 'Notify success.', data: 'success' });
});

export default app;
