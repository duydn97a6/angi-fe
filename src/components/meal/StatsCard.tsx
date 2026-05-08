import { cn } from '@/lib/utils/cn';

interface StatsCardProps {
  label: string;
  value: string | number;
  className?: string;
}

export function StatsCard({ label, value, className }: StatsCardProps) {
  return (
    <div className={cn('rounded-md bg-gray-50 p-3', className)}>
      <p className="text-caption text-gray-500">{label}</p>
      <p className="mt-0.5 text-h2 font-medium text-gray-900">{value}</p>
    </div>
  );
}