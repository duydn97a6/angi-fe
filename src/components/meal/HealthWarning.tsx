import { AlertTriangle } from 'lucide-react';

interface HealthWarningProps {
  warning: string;
  percentage?: number;
}

export function HealthWarning({ warning, percentage }: HealthWarningProps) {
  return (
    <div className="flex items-start gap-2 rounded-md border border-yellow-200 bg-yellow-50 p-3">
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-yellow-600" />
      <div>
        <p className="text-body-sm font-medium text-yellow-800">{warning}</p>
        {percentage != null && (
          <p className="mt-0.5 text-caption text-yellow-600">
            Tỷ lệ đồ dầu mỡ: {percentage}%
          </p>
        )}
      </div>
    </div>
  );
}