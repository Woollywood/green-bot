import React from 'react';
import { Outlet } from 'react-router';

export const Layout: React.FC = () => {
	return (
		<div className='container'>
			<div className='grid min-h-screen py-12'>
				<Outlet />
			</div>
		</div>
	);
};
