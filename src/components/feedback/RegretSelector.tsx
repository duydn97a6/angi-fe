import { cn } from '@/lib/utils/cn';

type RegretLevel = 'none' | 'slight' | 'high';

const options = [
  { value: 'none' as RegretLevel, label: 'Không hề' },
  { value: 'slight' as RegretLevel, label: 'Hơi chút' },
  { value: 'high' as RegretLevel, label: 'Có' },
];

interface RegretSelectorProps {
  value: RegretLevel | null;
  onChange: (value: RegretLevel) => void;
}

export function RegretSelector({ value, onChange }: RegretSelectorProps) {
  return (
    <div className="flex gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={cn(
            'flex-1 rounded-md border py-2 text-body-sm transition-all',
            value === opt.value
              ? 'border-coral-400 bg-coral-50 font-medium text-coral-800'
              : 'border-gray-200 bg-white hover:border-gray-300'
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}