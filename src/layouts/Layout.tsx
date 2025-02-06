import React from 'react';
import { Outlet } from 'react-router';

export const Layout: React.FC = () => {
	return (
		<div className='container'>
			<div className='py-root-layout-padding-y grid h-screen'>
				<Outlet />
			</div>
		</div>
	);
};
