import { TelegramHelper } from './../helpers';
import { db } from '../../db';
import dotenv from 'dotenv';
import { initModels, subscribers } from '../models/init-models';
import { Telegraf } from 'telegraf';
import { INotifyRequest } from './../custom/dto/notify_request';
import { IWebhookRequest } from './../../src/custom/dto/webhook_request';
import { IEnterRequest } from './../custom/dto/enter_request';

export default class SubscriberController {
  private bot = new Telegraf(process.env.TELEGRAM_TOKEN);

  async get(): Promise<subscribers[]> {
    return await initModels(db).subscribers.findAll({
      attributes: ['id', 'name', 'telegram_id', 'email'],
    });
  }

  async post(body: subscribers): Promise<subscribers> {
    const utc = new Date(new Date().toUTCString());
    body.created_at = utc;
    body.updated_at = utc;

    return await initModels(db).subscribers.create(body);
  }

  async notifyTelegram(request: INotifyRequest): Promise<boolean> {
    dotenv.config();
    const datas = await initModels(db).subscribers.findAll({
      attributes: ['telegram_id'],
    });

    const telegramHelper = new TelegramHelper(this.bot);

    datas.forEach(function (data) {
      const message = `Halo pembaca, bithubby.com sudah update post yang berjudul '${request.message}'. Selamat membaca.`;
      telegramHelper.sendMessage(data.telegram_id, message);
    });

    return true;
  }

  async enter(value: IEnterRequest): Promise<void> {
    const message: string = `${value.visitorId} enter your website. Platform: ${value.platform} | user-agent: ${value.userAgent}`;
    this.bot.telegram.sendMessage('612060297', message);
  }

  async register(update: IWebhookRequest): Promise<void> {
    if (update.message.text !== '/start') {
      this.bot.telegram.sendMessage(
        update.message.chat.id,
        "Silakan ketik '/start' untuk menghubungkan Telegram dengan bithubby.com"
      );
      return;
    }

    const utc = new Date(new Date().toUTCString());
    const id = update.message.chat.id.toString();
    let fullName = update.message.from.first_name;

    if (update.message.from.last_name) {
      fullName = `${update.message.from.first_name} ${update.message.from.last_name}`;
    }

    const exist = await initModels(db).subscribers.findOne({
      where: {
        telegram_id: id,
      },
      attributes: ['telegram_id'],
    });

    if (exist) {
      this.bot.telegram.sendMessage(
        update.message.chat.id,
        `${fullName}, Anda sudah terhubung dengan bithubby.com. Stay tuned :)`
      );
    } else {
      const data = initModels(db).subscribers.build({
        name: fullName,
        email: '-',
        telegram_id: update.message.chat.id.toString(),
        created_at: utc,
        updated_at: utc,
      });

      const result = await data.save();

      if (result) {
        this.bot.telegram.sendMessage(
          update.message.chat.id,
          `Selamat ${fullName}, Anda sudah berhasil terhubung dengan bithubby.com. Selamat membaca dan stay tuned. Terima kasih :)`
        );

        this.bot.telegram.sendMessage(
          '612060297',
          `${fullName} (${update.message.from.username}) mendaftar di bithubby.com`
        );
      }
    }
  }
}
