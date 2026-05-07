import { Badge } from '@/components/ui/badge';

type Category = 'safe' | 'familiar' | 'discovery';

const labels: Record<Category, string> = {
  safe: 'An toàn',
  familiar: 'Quen thuộc',
  discovery: 'Khám phá',
};

export function CategoryTag({ category }: { category: Category }) {
  return <Badge variant={category}>{labels[category]}</Badge>;
}