import { MessageSidebar } from '@/components/shared/messageSidebar';
import React from 'react';
import { Outlet } from 'react-router';

export const Component: React.FC = () => {
	return (
		<div className='grid h-full grid-cols-[1fr_3fr] gap-8 overflow-hidden'>
			<MessageSidebar />
			<div className='scroller'>
				<Outlet />
			</div>
		</div>
	);
};
