import express from 'express';
import dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import { SubscriberRoute } from './src/routes';
import { db } from './db';
import { Telegraf } from 'telegraf';

dotenv.config();
const app = express();
const bot = new Telegraf(process.env.TELEGRAM_TOKEN ?? '');

app.use(bot.webhookCallback('/register'));
bot.telegram.setWebhook('https://url.bithubby.com/api/subscribers/register');

app.use(bodyParser.json());

app.get('/', function (req, res, next) {
  res.status(200).json({ message: 'OK' });
});

app.use('/api/subscribers', SubscriberRoute);

app.listen(process.env.PORT, async () => {
  console.log(`Node server started running at ${process.env.PORT}`);
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
