import { Context, Telegraf } from 'telegraf';
import { Update } from 'telegraf/typings/core/types/typegram';

export default class TelegramHelper {
  constructor(private bot: Telegraf<Context<Update>>) {}

  async sendMessage(chatId: string | number, text: string): Promise<void> {
    await this.bot.telegram.sendMessage(chatId, text);
  }
}
