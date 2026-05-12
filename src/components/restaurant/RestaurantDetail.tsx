'use client';

import { ExternalLink, MapPin, Star, Phone, Clock, Bike } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { formatPrice, formatDistance } from '@/lib/utils/format';
import type { Restaurant } from '@/types';

interface RestaurantDetailProps {
  restaurant: Restaurant;
  onBack?: () => void;
}

export function RestaurantDetail({ restaurant, onBack }: RestaurantDetailProps) {
  const { deliveryLinks } = restaurant;

  return (
    <div>
      {/* Hero image */}
      {restaurant.imageUrl ? (
        <div className="relative h-48 w-full overflow-hidden rounded-lg bg-gray-100 md:h-56">
          <Image
            src={restaurant.imageUrl}
            alt={restaurant.name}
            fill
            className="object-cover"
            priority
          />
        </div>
      ) : (
        <div className="flex h-32 w-full items-center justify-center rounded-lg bg-gradient-to-br from-coral-50 to-coral-100 md:h-40">
          <span className="text-4xl">🍜</span>
        </div>
      )}

      {/* Main info */}
      <div className="mt-4">
        <h1 className="text-h2 font-medium text-gray-900 md:text-h1">
          {restaurant.name}
        </h1>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          {restaurant.cuisine && (
            <Badge variant="default">{restaurant.cuisine}</Badge>
          )}
          {restaurant.cuisineType && restaurant.cuisine !== restaurant.cuisineType && (
            <Badge variant="default">{restaurant.cuisineType}</Badge>
          )}
          {restaurant.rating != null && (
            <span className="flex items-center gap-1 text-body-sm text-gray-600">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              {restaurant.rating.toFixed(1)}
            </span>
          )}
        </div>

        {/* Metadata row */}
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-body-sm text-gray-500">
          {restaurant.distance != null && (
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {formatDistance(restaurant.distance)}
            </span>
          )}
          {restaurant.avgPrice != null && (
            <span className="flex items-center gap-1">
              Giá TB: {formatPrice(restaurant.avgPrice)}
            </span>
          )}
          {restaurant.openingHours && (
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {restaurant.openingHours}
            </span>
          )}
          {restaurant.phone && (
            <span className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              {restaurant.phone}
            </span>
          )}
        </div>

        {restaurant.address && (
          <p className="mt-2 text-body-sm text-gray-500">
            <MapPin className="mr-1 inline h-4 w-4" />
            {restaurant.address}
          </p>
        )}

        {restaurant.description && (
          <p className="mt-3 text-body text-gray-700">{restaurant.description}</p>
        )}
      </div>

      {/* Delivery links */}
      {(deliveryLinks?.grabfood || deliveryLinks?.shopeefood) && (
        <div className="mt-4 flex flex-wrap gap-2">
          {deliveryLinks.grabfood && (
            <Button
              variant="primary"
              size="md"
              onClick={() => window.open(deliveryLinks.grabfood!, '_blank')}
            >
              <Bike className="h-4 w-4" />
              Đặt qua GrabFood
              <ExternalLink className="h-3 w-3" />
            </Button>
          )}
          {deliveryLinks.shopeefood && (
            <Button
              variant="secondary"
              size="md"
              onClick={() => window.open(deliveryLinks.shopeefood!, '_blank')}
            >
              <Bike className="h-4 w-4" />
              Đặt qua ShopeeFood
              <ExternalLink className="h-3 w-3" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export function RestaurantDetailSkeleton() {
  return (
    <div>
      <Skeleton className="h-48 w-full rounded-lg md:h-56" />
      <div className="mt-4 space-y-3">
        <Skeleton className="h-8 w-3/5" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
        <div className="flex gap-4">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-20" />
        </div>
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}