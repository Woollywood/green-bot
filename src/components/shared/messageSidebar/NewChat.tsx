import React, { useLayoutEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/Form';
import { chatStore } from '@/store/Chat';

const schema = z.object({
	chatName: z.string(),
});
type SchemaType = z.infer<typeof schema>;

export const NewChat: React.FC = () => {
	const [isEditing, setEditing] = useState(false);
	const toggleEditing = () => setEditing(!isEditing);

	const form = useForm<SchemaType>({ defaultValues: { chatName: '' }, resolver: zodResolver(schema) });
	const onSubmit = ({ chatName }: SchemaType) => {
		chatStore.addChat(chatName);
		toggleEditing();
		form.reset();
	};

	useLayoutEffect(() => {
		if (isEditing) {
			form.setFocus('chatName');
		}
	}, [form, isEditing]);

	if (isEditing) {
		return (
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name='chatName'
						render={({ field }) => (
							<FormItem>
								<Input {...field} />
								<FormMessage />
							</FormItem>
						)}
					/>
				</form>
			</Form>
		);
	}

	return (
		<Button className='w-full' onClick={toggleEditing}>
			New chat
		</Button>
	);
};
