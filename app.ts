import express from 'express';
import dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import { SubscriberRoute } from './src/routes';
import { db } from './db';
import { Telegraf } from 'telegraf';
import { TelegramHelper } from './src/helpers';
import { initModels } from './src/models/init-models';

const app = express();
dotenv.config();

// Telegram
const bot = new Telegraf(process.env.TELEGRAM_TOKEN ?? '');
const telegramHelper = new TelegramHelper(bot);

bot.start(async (ctx) => {
  const utc = new Date(new Date().toUTCString());
  const id = ctx.chat.id.toString();
  let fullName = ctx.from.first_name;

  if (ctx.message.from.last_name) {
    fullName = `${ctx.message.from.first_name} ${ctx.message.from.last_name}`;
  }

  const exist = await initModels(db).subscribers.findOne({
    where: {
      telegram_id: id,
    },
  });

  if (exist) {
    ctx.reply(
      `${fullName}, Anda sudah terhubung dengan bithubby.com. Stay tuned :)`
    );
  } else {
    const data = initModels(db).subscribers.build({
      name: fullName,
      email: '-',
      telegram_id: ctx.chat.id.toString(),
      created_at: utc,
      updated_at: utc,
    });

    const result = await data.save();

    if (result) {
      ctx.reply(
        `Selamat ${fullName}, Anda sudah berhasil terhubung dengan bithubby.com. Selamat membaca dan stay tuned. Terima kasih :)`
      );

      bot.telegram.sendMessage(
        '612060297',
        `${fullName} (${ctx.from.username}) mendaftar di bithubby.com`
      );
    }
  }
});
bot.launch();
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

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
