import express from 'express';
import dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import { NotifyRoute, SubscriberRoute } from './src/routes';
import { db } from './db';
import cors from 'cors';
import { TelegramHelper } from './src/helpers';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', function (req, res, next) {
  res.status(200).json({ message: 'OK' });
});

app.post('/', function (req, res, next) {
  const telegramHelper = new TelegramHelper(process.env.TELEGRAM_TOKEN);
  telegramHelper.sendMessage(req.body.chatId, req.body.text);
  res.status(200).json({ message: 'Sent!' });
});

app.use('/api/subscribers', SubscriberRoute);
app.use('/api/notify', NotifyRoute);

app.listen(process.env.PORT, async () => {
  console.log(`Node server started running at ${process.env.PORT}`);
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
