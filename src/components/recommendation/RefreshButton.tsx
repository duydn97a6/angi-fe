'use client';

import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RefreshButtonProps {
  onClick: () => void;
  loading?: boolean;
}

export function RefreshButton({ onClick, loading }: RefreshButtonProps) {
  return (
    <Button variant="secondary" size="md" onClick={onClick} loading={loading}>
      <RefreshCw className="h-4 w-4" />
      Gợi ý khác
    </Button>
  );
}