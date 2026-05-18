import { Skeleton } from '@/components/ui/skeleton';

interface LoadingStateProps {
  count?: number;
  text?: string;
}

export function LoadingState({ count = 3, text }: LoadingStateProps) {
  return (
    <div className="page-enter" role="status" aria-label={text || 'Đang tải'}>
      {text && <p className="mb-3 text-caption text-gray-400">{text}</p>}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
        {Array.from({ length: count }).map((_, index) => (
          <Skeleton key={index} className="h-48" />
        ))}
      </div>
    </div>
  );
}