import { db } from '../../db';
import { initModels, url_short } from '../models/init-models';

export default class UrlShortenController {
  async get(): Promise<url_short[]> {
    return await initModels(db).url_short.findAll();
  }

  async post(body: url_short): Promise<url_short> {
    const utc = new Date(new Date().toUTCString());
    body.created_date = utc;
    body.updated_date = utc;

    return await initModels(db).url_short.create(body);
  }

  async getByCode(code: string): Promise<url_short | null> {
    const data = await initModels(db).url_short.findOne({
      where: {
        code: code,
      },
    });

    return data;
  }
}
