'use client';

import { cn } from '@/lib/utils/cn';

interface ChipSelectorProps {
  options: { value: string; label: string }[];
  selected: string[];
  onChange: (values: string[]) => void;
  multi?: boolean;
}

export function ChipSelector({ options, selected, onChange, multi = true }: ChipSelectorProps) {
  const toggle = (value: string) => {
    if (!multi) {
      onChange([value]);
      return;
    }

    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value));
      return;
    }

    onChange([...selected, value]);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isSelected = selected.includes(option.value);

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => toggle(option.value)}
            className={cn(
              'rounded-full border px-3 py-1.5 text-caption transition-all',
              isSelected
                ? 'border-coral-400 bg-coral-50 font-medium text-coral-800'
                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
            )}
          >
            {isSelected && '✓ '}{option.label}
          </button>
        );
      })}
    </div>
  );
}
