import { Layout } from '@/layouts/Layout';
import { RouteObject } from 'react-router';

const hydrateNullFallback = () => ({ HydrateFallback: () => null });

export const routes: RouteObject[] = [
	{
		element: <Layout />,
		children: [
			{ index: true, lazy: () => import('@/pages/home'), ...hydrateNullFallback() },
			{
				lazy: () => import('@/router/components/ProtectedRoutes'),
				...hydrateNullFallback(),
				children: [
					{
						lazy: () => import('@/layouts/ProtectedLayout'),
						children: [
							{
								path: 'messages',
								lazy: () => import('@/pages/messages'),
								...hydrateNullFallback(),
								children: [
									{
										path: ':id',
										lazy: () => import('@/pages/messages/[id]'),
										...hydrateNullFallback(),
									},
								],
							},
						],
					},
				],
			},
		],
	},
];
