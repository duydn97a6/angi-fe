'use client';

import { motion } from 'framer-motion';
import { MapPin, Star, Bike } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Card } from '@/components/ui/card';
import { CategoryTag } from './CategoryTag';
import { FeaturedBadge } from './FeaturedBadge';
import { AiExplanation } from './AiExplanation';
import { formatPrice, formatDistance } from '@/lib/utils/format';
import type { RecommendationItem } from '@/types';

interface RecommendationCardProps {
  recommendation: RecommendationItem;
  isFeatured?: boolean;
  onClick?: () => void;
}

export function RecommendationCard({
  recommendation,
  isFeatured,
  onClick,
}: RecommendationCardProps) {
  const { restaurant, dish, category, explanation, estimatedDeliveryMinutes } = recommendation;

  return (
    <motion.div whileTap={{ scale: 0.98 }} transition={{ duration: 0.1 }}>
      <Card
        featured={isFeatured}
        interactive
        onClick={onClick}
        className="relative"
      >
        {isFeatured && <FeaturedBadge />}

        <div className={cn('mb-2', isFeatured && 'mt-3')}>
          <CategoryTag category={category} />
        </div>

        <h3 className="line-clamp-2 text-body font-medium text-gray-900">
          {restaurant.name}
        </h3>

        <p className="mt-1 text-body-sm text-gray-600">
          {dish?.name || restaurant.cuisine || restaurant.cuisineType}
          {restaurant.avgPrice ? ` · ${formatPrice(restaurant.avgPrice)}` : ''}
        </p>

        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-caption text-gray-400">
          {restaurant.distance != null && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {formatDistance(restaurant.distance)}
            </span>
          )}
          {restaurant.rating != null && (
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              {restaurant.rating.toFixed(1)}
            </span>
          )}
          {estimatedDeliveryMinutes != null && (
            <span className="flex items-center gap-1">
              <Bike className="h-3 w-3" />
              {estimatedDeliveryMinutes}p
            </span>
          )}
        </div>

        {explanation && <AiExplanation explanation={explanation} />}
      </Card>
    </motion.div>
  );
}