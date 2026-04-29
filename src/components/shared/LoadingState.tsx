import { Skeleton } from '@/components/ui/skeleton';

interface LoadingStateProps {
  count?: number;
}

export function LoadingState({ count = 3 }: LoadingStateProps) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} className="h-48" />
      ))}
    </div>
  );
}
