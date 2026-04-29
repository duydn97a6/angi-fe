import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/authStore';

export function useAuth() {
  const router = useRouter();
  const store = useAuthStore();

  return {
    user: store.user,
    isAuthenticated: store.isAuthenticated,
    isHydrated: store.isHydrated,

    logout: () => {
      store.logout();
      router.push('/login');
    },
  };
}
