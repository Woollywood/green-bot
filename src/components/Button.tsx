import React from 'react';
import { cn } from '@/utils';

export const Button = React.forwardRef<
	HTMLButtonElement,
	React.PropsWithChildren & React.HTMLAttributes<HTMLButtonElement>
>(({ children, className, ...props }, ref) => {
	return (
		<button
			className={cn(
				'bg-primary hover:bg-primary/80 inline-flex cursor-pointer items-center justify-center rounded-sm px-4 py-2 font-medium transition-colors',
				className,
			)}
			{...props}
			ref={ref}>
			{children}
		</button>
	);
});
