import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, label, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-1.5 block text-body-sm font-medium text-gray-600">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'h-11 w-full rounded-md border border-gray-200 px-3.5 text-body text-gray-900 transition-all',
            'placeholder:text-gray-400',
            'focus:border-coral-400 focus:outline-none focus:ring-2 focus:ring-coral-50',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-50',
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-caption text-red-500">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';
