import { Button } from '@/components/ui/button';

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = '🤔 Ối, AI đang bận nghĩ...',
  description = 'Thử lại nhé?',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-gray-50 p-8 text-center">
      <h3 className="text-h3 font-medium text-gray-900">{title}</h3>
      <p className="mt-1 text-body-sm text-gray-500">{description}</p>
      {onRetry && (
        <Button className="mt-4" onClick={onRetry}>
          Thử lại
        </Button>
      )}
    </div>
  );
}
