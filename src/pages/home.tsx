import { Button } from '@/components/ui/Button';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { userStore } from '@/store/User';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { z } from 'zod';

const schema = z.object({
	apiUrl: z.string().url(),
	idInstance: z.string().min(3),
	apiTokenInstance: z.string().min(3),
});
type SchemaType = z.infer<typeof schema>;

export const Component: React.FC = () => {
	const navigate = useNavigate();

	const form = useForm<SchemaType>({
		defaultValues: {
			apiUrl: '',
			idInstance: '',
			apiTokenInstance: '',
		},
		resolver: zodResolver(schema),
	});

	const onSubmit = ({ apiUrl, idInstance, apiTokenInstance }: SchemaType) => {
		userStore.setFields({ apiUrl, idInstance, apiTokenInstance });
		navigate('/messages');
	};

	return (
		<div className='flex h-full flex-col items-center justify-center'>
			<h1 className='mb-12 text-4xl font-medium'>Sign in</h1>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='flex w-[24vw] flex-col gap-4'>
					<FormField
						control={form.control}
						name='apiUrl'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Api URL</FormLabel>
								<Input {...field} />
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='idInstance'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Id Instance</FormLabel>
								<Input {...field} />
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='apiTokenInstance'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Api Token Instance</FormLabel>
								<Input {...field} />
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className='w-full py-6'>
						<Button className='w-full'>Submit</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};
