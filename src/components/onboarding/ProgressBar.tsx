import { cn } from '@/lib/utils/cn';

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  return (
    <div className="flex gap-1" aria-label={`Bước ${current} trên ${total}`}>
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'h-1 flex-1 rounded-full transition-colors',
            index < current ? 'bg-coral-400' : 'bg-gray-200'
          )}
        />
      ))}
    </div>
  );
}
