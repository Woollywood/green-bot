import { chatApi } from '@/api/chatApi';
import { INotification } from '@/api/notificationApi';
import { Send } from '@/components/icons/Send';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { chatStore } from '@/store/Chat';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';

export const Component: React.FC = observer(() => {
	const { id } = useParams<{ id: string }>();

	if (!id) {
		throw new Error('Invalid id');
	}

	const textareaRef = useRef<HTMLTextAreaElement>(null);
	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.focus();
		}
	}, []);

	useEffect(() => {
		let unmounted = false;
		const cancelEvent = new Event('cancel-receive-notification');

		const receiveNotifications = async (notification: INotification | null) => {
			if (!notification) {
				return;
			}

			await chatStore.receiveNotification(10, cancelEvent, id);
		};

		const receive = async () => {
			while (!unmounted) {
				const notification = await chatStore.receiveNotification(10, cancelEvent, id);
				if (notification) {
					await receiveNotifications(notification);
				}
			}
		};

		receive();

		return () => {
			unmounted = true;
			chatStore.clearMessages();
			document.dispatchEvent(cancelEvent);
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
				<Textarea
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					ref={textareaRef}
					onKeyDown={(e) => e.key === 'Enter' && handleSend()}
				/>
				<Button size='icon' disabled={isSending} onClick={handleSend}>
					<Send />
				</Button>
			</div>
		</div>
	);
});
