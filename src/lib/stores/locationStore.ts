import { create } from 'zustand';

interface Location {
  lat: number;
  lng: number;
  district?: string;
  address?: string;
  accuracy?: number;
  source: 'gps' | 'office' | 'manual';
}

interface LocationState {
  currentLocation: Location | null;
  isLoading: boolean;
  error: string | null;

  getCurrentLocation: () => Promise<void>;
  setManualLocation: (location: Omit<Location, 'source'>) => void;
  useOfficeLocation: (office: { lat: number; lng: number; address: string }) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  currentLocation: null,
  isLoading: false,
  error: null,

  getCurrentLocation: async () => {
    if (!navigator.geolocation) {
      set({ error: 'Trình duyệt không hỗ trợ định vị' });
      return;
    }

    set({ isLoading: true, error: null });

    return new Promise<void>((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          set({
            currentLocation: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              accuracy: position.coords.accuracy,
              source: 'gps',
            },
            isLoading: false,
          });
          resolve();
        },
        (error) => {
          const messages: Record<number, string> = {
            1: 'Bạn đã từ chối quyền truy cập vị trí',
            2: 'Không thể xác định vị trí',
            3: 'Hết thời gian chờ',
          };
          set({
            error: messages[error.code] || 'Lỗi định vị',
            isLoading: false,
          });
          resolve();
        },
        { enableHighAccuracy: false, timeout: 5000, maximumAge: 60000 }
      );
    });
  },

  setManualLocation: (location) => set({
    currentLocation: { ...location, source: 'manual' },
    error: null,
  }),

  useOfficeLocation: (office) => set({
    currentLocation: { ...office, source: 'office' },
    error: null,
  }),
}));
