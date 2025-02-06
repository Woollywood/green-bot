import React from 'react';
import { Link } from 'react-router';
import { Button } from '../ui/Button';
import { userStore } from '@/store/User';

export const Header: React.FC = () => {
	return (
		<header className='h-header-height flex items-center justify-between gap-12'>
			<Link to='/messages' className='text-4xl font-medium'>
				Logo
			</Link>
			<Button onClick={() => userStore.resetFields()}>Sign out</Button>
		</header>
	);
};
