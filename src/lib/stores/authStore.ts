import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { authApi } from '@/lib/api/auth';
import { clearAuthCookies, setAuthCookies } from '@/lib/utils/authCookies';
import { normalizeToken } from '@/lib/utils/token';

interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  phone?: string;
  isOnboarded?: boolean;
  preferences?: any;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isHydrated: boolean;

  // Actions
  setAuth: (user: User, tokens: { accessToken?: string | null; refreshToken?: string | null }) => void;
  setUser: (user: User) => void;
  refresh: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isHydrated: false,

      setAuth: (user, tokens) => {
        const accessToken = normalizeToken(tokens.accessToken);
        const refreshToken = normalizeToken(tokens.refreshToken);
        if (!accessToken) {
          clearAuthCookies();
          set({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
          });
          throw new Error('Invalid auth tokens');
        }

        setAuthCookies(accessToken, refreshToken);
        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
        });
      },

      setUser: (user) => set({ user }),

      refresh: async () => {
        const { refreshToken } = get();
        if (!refreshToken) throw new Error('No refresh token');

        const response = await authApi.refresh(refreshToken);
        const accessToken = normalizeToken(response.accessToken);
        if (!accessToken) throw new Error('Invalid access token');
        set({ accessToken });
      },

      logout: () => {
        authApi.logout().catch(() => {});
        clearAuthCookies();
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'angi-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) state.isHydrated = true;
      },
    }
  )
);
