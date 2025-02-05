import { userStore } from '@/store/User';
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';

export const Component: React.FC = () => {
	const navigate = useNavigate();

	useEffect(() => {
		if (!userStore.isValid) {
			navigate('/');
		}
	}, [navigate]);

	return (
		<div className='grid grid-cols-[1fr_3fr] gap-8'>
			<div>Messages</div>
			<div>
				<Outlet />
			</div>
		</div>
	);
};
