'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { MapPin, Star, Bike } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { formatPrice, formatDistance } from '@/lib/utils/format';
import type { Restaurant } from '@/types';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick?: () => void;
}

export function RestaurantCard({ restaurant, onClick }: RestaurantCardProps) {
  return (
    <motion.div whileTap={onClick ? { scale: 0.98 } : undefined} transition={{ duration: 0.1 }}>
      <Card interactive={!!onClick} onClick={onClick} className="flex items-start gap-3">
        {restaurant.imageUrl && (
          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-1 text-body font-medium text-gray-900">
            {restaurant.name}
          </h3>

          <p className="mt-0.5 text-body-sm text-gray-600">
            {restaurant.cuisine || restaurant.cuisineType}
            {restaurant.avgPrice ? ` · ${formatPrice(restaurant.avgPrice)}` : ''}
          </p>

          <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5 text-caption text-gray-400">
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
            {restaurant.distance != null && (
              <span className="flex items-center gap-1">
                <Bike className="h-3 w-3" />
                ~15p
              </span>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}