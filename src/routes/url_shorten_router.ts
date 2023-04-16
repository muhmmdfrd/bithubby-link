import express, { Request, Response } from 'express';
import { UrlShortenController } from '../controllers';

const app = express.Router();
const controller = new UrlShortenController();

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

app.post('/code', async function name(request: Request, response: Response) {
  const data = await controller.getByCode(request.body.code);

  if (data) {
    response.redirect(data.url ?? '');
  } else {
    response.status(404).json({ message: 'URL not found.' });
  }
});

app.put('/', async function () {});

export default app;
