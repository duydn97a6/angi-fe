import { cn } from '@/lib/utils/cn';

type Emoji = 'sad' | 'neutral' | 'happy';

const options = [
  { value: 'sad' as Emoji, emoji: '😕', label: 'Tệ' },
  { value: 'neutral' as Emoji, emoji: '😐', label: 'Ổn' },
  { value: 'happy' as Emoji, emoji: '😋', label: 'Tuyệt!' },
];

interface EmojiSelectorProps {
  value: Emoji | null;
  onChange: (emoji: Emoji) => void;
}

export function EmojiSelector({ value, onChange }: EmojiSelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {options.map((opt) => {
        const isSelected = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              'flex flex-col items-center gap-1 rounded-md border p-4 transition-all',
              isSelected
                ? opt.value === 'happy'
                  ? 'border-2 border-green-500 bg-green-50'
                  : opt.value === 'sad'
                    ? 'border-2 border-red-500 bg-red-50'
                    : 'border-2 border-gray-400 bg-gray-50'
                : 'border border-gray-200 bg-white hover:border-gray-300'
            )}
          >
            <div className="text-2xl">{opt.emoji}</div>
            <div className={cn('text-caption', isSelected ? 'font-medium' : 'text-gray-600')}>
              {opt.label}
            </div>
          </button>
        );
      })}
    </div>
  );
}