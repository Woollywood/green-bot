import { userStore } from '@/store/User';
import { BaseApi } from './baseApi';

type TypeWebhook =
	| 'incomingMessageReceived'
	| 'outgoingMessageReceived'
	| 'outgoingAPIMessageReceived'
	| 'outgoingMessageStatus';

interface INotificationInstanceData {
	idInstance: number;
	wid: string;
	typeInstance: string;
}
export interface INotification {
	typeWebhook: TypeWebhook;
	instanceData: INotificationInstanceData;
	idMessage: string;
	timestamp: number;
}
interface INotificationResponse {
	receiptId: number;
	body: INotification;
}

export interface ISenderData {
	chatId: string;
	sender: string;
	chatName: string;
	senderName: string;
	senderContactName: string;
}

export interface INotificationOutgoindMessageReceived extends INotification {
	typeWebhook: 'outgoingMessageReceived';
	senderData: ISenderData;
	messageData: {
		typeMessage: 'textMessage';
		textMessageData: {
			textMessage: string;
		};
	};
}

export interface INotificationOutgoingAPIMessageReceived extends INotification {
	typeWebhook: 'outgoingAPIMessageReceived';
	senderData: ISenderData;
	messageData: {
		typeMessage: 'textMessage';
		extendedTextMessageData: {
			text: string;
			description: string;
			title: string;
			previewType: string;
			jpegThumbnail: string;
			forwardingScore: number;
			isForwarded: boolean;
		};
	};
}

export interface INotificationIncomingMessageReceived extends INotification {
	typeWebhook: 'incomingMessageReceived';
	senderData: ISenderData;
	messageData: {
		typeMessage: 'textMessage';
		textMessageData: {
			textMessage: 'Привет!';
		};
	};
}

export interface INotificationOutgoingMessageStatus extends INotification {
	typeWebhook: 'outgoingMessageStatus';
	status: 'sent';
	sendByApi: boolean;
}

interface INotificationDelete {
	result: boolean;
	reason: string;
}

class NotificationApi extends BaseApi {
	async receiveNotification(receiveTimeout = 5) {
		const { data } = await this.request<INotificationResponse | null>({
			method: 'get',
			url: `receiveNotification/${userStore.apiTokenInstance}`,
			params: { receiveTimeout },
		});

		return data;
	}
	async deleteNotification(receiptId: number) {
		return await this.request<INotificationDelete>({
			method: 'delete',
			url: `deleteNotification/${userStore.apiTokenInstance}/${receiptId}`,
		});
	}
}

export const notificationApi = new NotificationApi();
