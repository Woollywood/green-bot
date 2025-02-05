import React from 'react';
import { Outlet } from 'react-router';

export const Component: React.FC = () => {
	return (
		<div className='grid grid-cols-[1fr_3fr] gap-8'>
			<div>Messages</div>
			<div>
				<Outlet />
			</div>
		</div>
	);
};
