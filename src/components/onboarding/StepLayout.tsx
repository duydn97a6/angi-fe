import { Button } from '@/components/ui/button';

interface StepLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  nextLabel?: string;
  disabled?: boolean;
  loading?: boolean;
  onNext: () => void;
  onBack?: () => void;
  onSkip?: () => void;
}

export function StepLayout({
  title,
  description,
  children,
  nextLabel = 'Tiếp tục →',
  disabled,
  loading,
  onNext,
  onBack,
  onSkip,
}: StepLayoutProps) {
  return (
    <div>
      {onBack && (
        <button type="button" className="mb-5 text-body-sm font-medium text-gray-500" onClick={onBack}>
          ← Quay lại
        </button>
      )}
      <h1 className="mb-1.5 text-h2 font-medium text-gray-900">{title}</h1>
      <p className="mb-5 text-body-sm text-gray-500">{description}</p>
      {children}
      <Button fullWidth className="mt-6" onClick={onNext} disabled={disabled} loading={loading}>
        {nextLabel}
      </Button>
      {onSkip && (
        <button type="button" className="mt-3 w-full text-center text-caption text-gray-400" onClick={onSkip}>
          Bỏ qua onboarding
        </button>
      )}
    </div>
  );
}
