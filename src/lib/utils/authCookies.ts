import { isValidToken } from '@/lib/utils/token';

export function setAuthCookies(accessToken: string, refreshToken: string) {
  if (!isValidToken(accessToken) || !isValidToken(refreshToken)) {
    clearAuthCookies();
    return;
  }

  document.cookie = `accessToken=${accessToken}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
  document.cookie = `refreshToken=${refreshToken}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`;
}

export function clearAuthCookies() {
  document.cookie = 'accessToken=; path=/; max-age=0; SameSite=Lax';
  document.cookie = 'refreshToken=; path=/; max-age=0; SameSite=Lax';
}
