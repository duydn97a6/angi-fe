import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-gray-50 p-8 text-center">
      <div className="mb-3 text-3xl">{icon || '🍜'}</div>
      <h3 className="text-h3 font-medium text-gray-900">{title}</h3>
      {description && <p className="mt-1 text-body-sm text-gray-500">{description}</p>}
      {action && (
        <Button className="mt-4" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
