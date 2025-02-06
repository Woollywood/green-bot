import React from 'react';
import { cn } from '@/utils';

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.InputHTMLAttributes<HTMLTextAreaElement>>(
	({ className, ...props }, ref) => {
		return (
			<textarea
				className={cn(
					'hover:ring-primary/80 focus:ring-primary/80 ring-primary block w-full rounded-sm px-3 py-2 font-medium ring transition-shadow ring-inset hover:ring-2 focus:ring-2 focus:outline-none',
					className,
				)}
				{...props}
				ref={ref}
			/>
		);
	},
);
