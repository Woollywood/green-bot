import { chatApi } from '@/api/chatApi';
import { INotification } from '@/api/notificationApi';
import { Send } from '@/components/icons/Send';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { chatStore } from '@/store/Chat';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

export const Component: React.FC = observer(() => {
	const { id } = useParams<{ id: string }>();

	if (!id) {
		throw new Error('Invalid id');
	}

	const receiveNotifications = async (notification: INotification | null) => {
		if (!notification) {
			return;
		}

		await chatStore.receiveNotification(10);
	};

	useEffect(() => {
		chatStore.currentChatId = id;

		const receive = async () => {
			while (true) {
				const notification = await chatStore.receiveNotification(10);
				if (notification) {
					await receiveNotifications(notification);
				}
			}
		};
		receive();

		return () => {
			chatStore.currentChatId = null;
			chatStore.clearMessages();
		};
	}, [id]);

	const [inputValue, setInputValue] = useState('');
	const [isSending, setSending] = useState(false);

	const handleSend = async () => {
		if (inputValue.length === 0) {
			return;
		}

		setSending(true);
		await chatApi.sendMessage(id!, inputValue);
		setInputValue('');
		setSending(false);
	};

	return (
		<div className='scroller border-primary grid h-full grid-rows-[1fr_auto] gap-4 rounded-sm border-2 px-6 py-4'>
			<div>
				{chatStore.messages.map((message) => (
					<div key={message.idMessage}>{message.text}</div>
				))}
			</div>
			<div className='flex items-end gap-2'>
				<Textarea value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
				<Button size='icon' disabled={isSending} onClick={handleSend}>
					<Send />
				</Button>
			</div>
		</div>
	);
});
