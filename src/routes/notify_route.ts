import express, { Request, Response } from 'express';
import { NotifyController } from '../controllers';

const app = express.Router();
const controller = new NotifyController();

app.post('/', async function (request: Request, response: Response) {
  try {
    const data = await controller.post(request.body);
    response.status(200).json({ message: 'Notify success.', data: data });
  } catch (err) {
    response.status(500).json({ messsage: err.message, data: null });
  }
});

export default app;
