import { Header } from '@/components/shared/Header';
import React from 'react';
import { Outlet } from 'react-router';

export const Component: React.FC = () => {
	return (
		<div className='space-y-inner-layout-gap'>
			<Header />
			<div className='h-full max-h-[calc(100vh-(var(--root-layout-padding-y)*2+var(--inner-layout-gap)+var(--header-height)))] overflow-hidden'>
				<Outlet />
			</div>
		</div>
	);
};
