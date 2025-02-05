import { userStore } from '@/store/User';
import { BaseApi } from './baseApi';

class ChatApi extends BaseApi {
	async getChatHistory(chatId: string, count = 100) {
		return await this.request({
			method: 'post',
			url: `getChatHistory/${userStore.apiTokenInstance}`,
			data: {
				chatId: `${chatId}@c.us`,
				count,
			},
		});
	}
	async sendMessage(chatId: string, message: string) {
		return await this.request({
			method: 'post',
			url: `sendMessage/${userStore.apiTokenInstance}`,
			data: {
				chatId: `${chatId}@c.us`,
				message,
			},
		});
	}
}

export const chatApi = new ChatApi();
