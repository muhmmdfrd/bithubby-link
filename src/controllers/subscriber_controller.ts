import { db } from '../../db';
import { initModels, subscribers } from '../models/init-models';

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

  async notifyTelegram(): Promise<boolean> {
    const ids = await initModels(db).subscribers.findAll({
      attributes: ['telegram_id'],
    });

    ids.forEach(function (id) {});

    return true;
  }
}
