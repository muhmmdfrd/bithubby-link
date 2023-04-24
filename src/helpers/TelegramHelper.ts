import axios from 'axios';

export default class TelegramHelper {
  constructor(private token: string) {}

  async sendMessage(chatId: string | number, text: string): Promise<void> {
    const url = `https://api.telegram.org/bot${this.token}/sendMessage?chat_id=${chatId}&text=${text}`;
    axios
      .post(url)
      .then((response) => {
        console.log('Message sent:', response.data);
      })
      .catch((error) => {
        console.error('Error sending message:', error.response.data);
      });
  }
}
