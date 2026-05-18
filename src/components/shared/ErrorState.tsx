import { Button } from '@/components/ui/button';
import { Mascot } from '@/components/shared/Mascot';

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Ối, có lỗi xảy ra',
  description = 'Đã có sự cố không mong muốn. Vui lòng thử lại.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-gray-50 p-8 text-center page-enter">
      <Mascot mood="sad" size="lg" />
      <h3 className="mt-4 text-h3 font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-body-sm text-gray-500">{description}</p>
      {onRetry && (
        <Button className="mt-4" onClick={onRetry}>
          Thử lại
        </Button>
      )}
    </div>
  );
}