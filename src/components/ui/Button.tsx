import React from 'react';
import { cn } from '@/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
	'inline-flex cursor-pointer items-center justify-center rounded-sm font-medium transition-colors',
	{
		variants: {
			variant: {
				default: 'bg-primary hover:bg-primary/80',
			},
			size: {
				default: 'h-10 px-4 py-2',
				icon: 'h-10 w-10',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

export const Button = React.forwardRef<
	HTMLButtonElement,
	React.PropsWithChildren & React.HTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>
>(({ children, className, variant, size, ...props }, ref) => {
	return (
		<button className={cn(buttonVariants({ variant, size, className }))} {...props} ref={ref}>
			{children}
		</button>
	);
});
