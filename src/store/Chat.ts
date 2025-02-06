import {
	INotificationIncomingMessageReceived,
	INotificationOutgoindMessageReceived,
	INotificationOutgoingAPIMessageReceived,
	ISenderData,
	notificationApi,
} from '@/api/notificationApi';
import { makeAutoObservable } from 'mobx';

interface IMessage {
	idMessage: string;
	senderData: ISenderData;
	timestamp: number;
	text: string;
}

export type IChatItem = {
	id: string;
	label: string;
};

class Chat {
	chats: IChatItem[] = [];
	currentChatId: string | null = null;
	messages: IMessage[] = [];

	constructor() {
		makeAutoObservable(this);
	}

	get isEmptyChats() {
		return this.chats.length === 0;
	}

	get isEmptyMessages() {
		return this.messages.length === 0;
	}

	_getItemId(item: string) {
		return `${item}@c.us`;
	}

	addChat(item: string) {
		this.chats.push({ id: this._getItemId(item), label: item });
	}

	deleteChat(item: IChatItem) {
		this.chats = this.chats.filter((it) => it !== item);
	}

	async receiveNotification(receiveTimeout = 5) {
		const res = await notificationApi.receiveNotification(receiveTimeout);

		if (!res) {
			return;
		}

		const { body, receiptId } = res;

		await notificationApi.deleteNotification(receiptId);
		const { typeWebhook } = body;
		switch (typeWebhook) {
			case 'outgoingMessageReceived':
				{
					const currentBody = body as INotificationOutgoindMessageReceived;
					if (currentBody.senderData.chatId === this.currentChatId) {
						this.messages.push({
							idMessage: currentBody.idMessage,
							timestamp: currentBody.timestamp,
							senderData: currentBody.senderData,
							text: currentBody.messageData.textMessageData.textMessage,
						});
					}
				}
				break;
			case 'outgoingAPIMessageReceived':
				{
					const currentBody = body as INotificationOutgoingAPIMessageReceived;
					if (currentBody.senderData.chatId === this.currentChatId) {
						this.messages.push({
							idMessage: currentBody.idMessage,
							timestamp: currentBody.timestamp,
							senderData: currentBody.senderData,
							text: currentBody.messageData.extendedTextMessageData.text,
						});
					}
				}
				break;
			case 'incomingMessageReceived': {
				const currentBody = body as INotificationIncomingMessageReceived;
				if (currentBody.senderData.chatId === this.currentChatId) {
					this.messages.push({
						idMessage: currentBody.idMessage,
						timestamp: currentBody.timestamp,
						senderData: currentBody.senderData,
						text: currentBody.messageData.textMessageData.textMessage,
					});
				}
			}
		}

		return body;
	}

	clearMessages() {
		this.messages = [];
	}
}

export const chatStore = new Chat();
