import { db } from './../../db';
import { initModels } from './../models/init-models';
import { Context, Telegraf } from 'telegraf';
import { Update } from 'telegraf/typings/core/types/typegram';

export default class TelegramHelper {
  constructor(private bot: Telegraf<Context<Update>>) {}

  async start() {
    this.bot.start(async (ctx) => {
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

          this.bot.telegram.sendMessage(
            '612060297',
            `${fullName} (${ctx.from.username}) mendaftar di bithubby.com`
          );
        }
      }
    });
  }

  async sendMessage(chatId: string | number, text: string): Promise<void> {
    await this.bot.telegram.sendMessage(chatId, text);
  }
}
