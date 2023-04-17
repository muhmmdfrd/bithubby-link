import express from 'express';
import dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import { SubscriberRoute } from './src/routes';
import { db } from './db';
import { Telegraf } from 'telegraf';
import { TelegramHelper } from './src/helpers';

const app = express();
dotenv.config();

// Telegram
const bot = new Telegraf(process.env.TELEGRAM_TOKEN ?? '');
const telegramHelper = new TelegramHelper(bot);
telegramHelper.start();
bot.launch();
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

app.use(bodyParser.json());
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
