import { Button } from '@/components/ui/button';
import { Mascot } from '@/components/shared/Mascot';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({
  title = 'Chưa có dữ liệu',
  description,
  icon,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-gray-50 p-8 text-center page-enter">
      {icon || <Mascot mood="thinking" size="lg" />}
      <h3 className="mt-4 text-h3 font-medium text-gray-900">{title}</h3>
      {description && <p className="mt-2 text-body-sm text-gray-500">{description}</p>}
      {action && (
        <Button className="mt-4" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}