'use client';

import { Clock, Cloud, MapPin } from 'lucide-react';
import { useLocation } from '@/lib/hooks/useLocation';
import { useWeather } from '@/lib/hooks/useWeather';

export function ContextBar() {
  const { data: weather } = useWeather();
  const { location } = useLocation();
  const time = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="flex items-center gap-3 rounded-md bg-blue-50 px-3 py-2 text-caption">
      {weather && (
        <span className="flex items-center gap-1 text-blue-800">
          <Cloud className="h-3 w-3" />
          {weather.temp}°C
        </span>
      )}
      {location && (
        <>
          <span className="text-blue-400">·</span>
          <span className="flex items-center gap-1 text-blue-800">
            <MapPin className="h-3 w-3" />
            {location.district || location.address || 'Vị trí hiện tại'}
          </span>
        </>
      )}
      <span className="text-blue-400">·</span>
      <span className="flex items-center gap-1 text-blue-800">
        <Clock className="h-3 w-3" />
        {time}
      </span>
    </div>
  );
}
