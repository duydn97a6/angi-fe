'use client';

import { Clock, Cloud, MapPin } from 'lucide-react';
import { useLocation } from '@/lib/hooks/useLocation';
import { useWeather } from '@/lib/hooks/useWeather';
import { Skeleton } from '@/components/ui/skeleton';

export function ContextBar() {
  const { data: weather, isLoading: weatherLoading } = useWeather();
  const { location, isLoading: locationLoading } = useLocation();
  const time = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="flex items-center gap-3 rounded-md bg-blue-50 px-3 py-2 text-caption" role="status" aria-label="Thông tin bối cảnh">
      {weatherLoading ? (
        <Skeleton className="h-4 w-12" />
      ) : weather ? (
        <span className="flex items-center gap-1 text-blue-800">
          <Cloud className="h-3 w-3" aria-hidden="true" />
          {weather.temp}°C
        </span>
      ) : null}
      {locationLoading ? (
        <Skeleton className="h-4 w-20" />
      ) : location ? (
        <>
          {weather && <span className="text-blue-400" aria-hidden="true">·</span>}
          <span className="flex items-center gap-1 text-blue-800">
            <MapPin className="h-3 w-3" aria-hidden="true" />
            {location.district || location.address || 'Vị trí hiện tại'}
          </span>
        </>
      ) : null}
      <span className="text-blue-400" aria-hidden="true">·</span>
      <span className="flex items-center gap-1 text-blue-800">
        <Clock className="h-3 w-3" aria-hidden="true" />
        {time}
      </span>
    </div>
  );
}