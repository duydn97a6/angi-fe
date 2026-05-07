import { Sparkles } from 'lucide-react';

export function FeaturedBadge() {
  return (
    <div className="absolute -top-2 left-3 flex items-center gap-1 rounded-md bg-coral-400 px-2 py-0.5 text-caption font-medium text-white">
      <Sparkles className="h-3 w-3" />
      AI đề xuất #1
    </div>
  );
}