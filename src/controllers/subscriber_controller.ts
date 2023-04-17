import { TelegramHelper } from './../helpers';
import { db } from '../../db';
import dotenv from 'dotenv';
import { initModels, subscribers } from '../models/init-models';
import { Telegraf } from 'telegraf';
import { INotifyRequest } from './../custom/dto/notify_request';

export default class SubscriberController {
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
    const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

    const telegramHelper = new TelegramHelper(bot);

    datas.forEach(function (data) {
      const message = `Halo pembaca, bithubby.com sudah update post yang berjudul '${request.message}'. Selamat membaca.`;
      telegramHelper.sendMessage(data.telegram_id, message);
    });

    return true;
  }
}
