import { type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';

const badgeVariants = cva('inline-flex items-center rounded-full px-2.5 py-0.5 text-caption font-medium', {
  variants: {
    variant: {
      default: 'bg-gray-100 text-gray-800',
      safe: 'bg-greenie-50 text-greenie-800',
      familiar: 'bg-purple-50 text-purple-800',
      discovery: 'bg-amber-50 text-amber-800',
      coral: 'bg-coral-50 text-coral-800',
      info: 'bg-blue-50 text-blue-800',
      success: 'bg-green-50 text-green-800',
      warning: 'bg-yellow-50 text-yellow-800',
      danger: 'bg-red-50 text-red-800',
    },
  },
  defaultVariants: { variant: 'default' },
});

interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
