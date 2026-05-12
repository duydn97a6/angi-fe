'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Flame } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils/format';
import type { Dish } from '@/types';

interface DishCardProps {
  dish: Dish;
  onClick?: () => void;
}

export function DishCard({ dish, onClick }: DishCardProps) {
  return (
    <motion.div whileTap={onClick ? { scale: 0.98 } : undefined} transition={{ duration: 0.1 }}>
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-start gap-3 rounded-lg border border-gray-100 bg-white p-3 text-left transition-all hover:border-gray-200 hover:shadow-sm"
      >
        {dish.imageUrl && (
          <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
            <Image
              src={dish.imageUrl}
              alt={dish.name}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h4 className="line-clamp-1 text-body-sm font-medium text-gray-900">
              {dish.name}
            </h4>
            {dish.isPopular && (
              <Flame className="h-3.5 w-3.5 flex-shrink-0 text-coral-400" />
            )}
          </div>

          {dish.description && (
            <p className="mt-0.5 line-clamp-1 text-caption text-gray-500">
              {dish.description}
            </p>
          )}

          <div className="mt-1 flex items-center gap-2">
            {dish.price != null && (
              <span className="text-body-sm font-medium text-coral-500">
                {formatPrice(dish.price)}
              </span>
            )}
            {dish.category && (
              <Badge variant="default" className="text-[10px]">
                {dish.category}
              </Badge>
            )}
          </div>
        </div>
      </button>
    </motion.div>
  );
}