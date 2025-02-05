import React from 'react';
import { observer } from 'mobx-react-lite';
import { userStore } from '@/store/User';
import { Navigate, Outlet } from 'react-router';

export const Component: React.FC = observer(() => {
	if (!userStore.isValid) {
		return <Navigate to='/' replace />;
	}

	return <Outlet />;
});
