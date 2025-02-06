import React from 'react';
import { observer } from 'mobx-react-lite';
import { NewChat } from './NewChat';
import { cn } from '@/utils';
import { chatStore, IChatItem } from '@/store/Chat';
import { Link } from 'react-router';
import { Trash } from '@/components/icons/Trash';
import { Button } from '@/components/ui/Button';

export const MessageSidebar: React.FC = observer(() => {
	const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, item: IChatItem) => {
		e.preventDefault();
		e.stopPropagation();
		chatStore.deleteChat(item);
	};

	return (
		<aside className='scroller border-primary rounded-sm border-2'>
			<div className={cn('px-8 py-6')}>
				<NewChat />
			</div>
			{!chatStore.isEmptyChats && (
				<div className='divide-primary border-primary divide-y border-t'>
					{chatStore.chats.map((item) => (
						<Link
							key={item.label}
							className='hover:bg-primary/40 flex items-center justify-between gap-12 px-6 py-4 text-lg font-medium transition-colors'
							to={`/messages/${item.id}`}>
							<div>{item.label}</div>
							<Button size='icon' className='hover:bg-primary/60' onClick={(e) => handleDelete(e, item)}>
								<Trash />
							</Button>
						</Link>
					))}
				</div>
			)}
		</aside>
	);
});
