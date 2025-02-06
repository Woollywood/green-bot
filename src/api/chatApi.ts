import { userStore } from '@/store/User';
import { BaseApi } from './baseApi';

class ChatApi extends BaseApi {
	async sendMessage(chatId: string, message: string) {
		return await this.request<{ idMessage: string }>({
			method: 'post',
			url: `sendMessage/${userStore.apiTokenInstance}`,
			data: {
				chatId,
				message,
			},
		});
	}
}

export const chatApi = new ChatApi();
