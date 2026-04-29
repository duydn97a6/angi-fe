'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface OptionCardProps {
  title: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
}

export function OptionCard({ title, description, selected, onClick }: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full rounded-md border p-3 text-left transition-all',
        selected
          ? 'border-2 border-coral-400 bg-coral-50'
          : 'border border-gray-200 bg-white hover:border-gray-300'
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className={cn('text-body font-medium', selected ? 'text-coral-800' : 'text-gray-900')}>
            {title}
          </div>
          {description && (
            <div className={cn('mt-0.5 text-body-sm', selected ? 'text-coral-600' : 'text-gray-500')}>
              {description}
            </div>
          )}
        </div>
        {selected && <Check className="h-5 w-5 shrink-0 text-coral-400" />}
      </div>
    </button>
  );
}
