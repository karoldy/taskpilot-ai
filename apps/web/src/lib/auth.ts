import dayjs from 'dayjs';
import { useAuthStore } from '@/stores';

const KEYS = {
  accessToken: 'accessToken',
  accessTokenExpiresAt: 'accessTokenExpiresAt',
  refreshToken: 'refreshToken',
  refreshTokenExpiresAt: 'refreshTokenExpiresAt',
} as const;

/** 写入登录成功的 token 及过期时间 */
export function setAuthTokens(payload: {
  accessToken: string;
  refreshToken: string;
}) {
  const now = dayjs();
  localStorage.setItem(KEYS.accessToken, payload.accessToken);
  localStorage.setItem(KEYS.accessTokenExpiresAt, now.add(10, 'hour').valueOf().toString());
  localStorage.setItem(KEYS.refreshToken, payload.refreshToken);
  localStorage.setItem(KEYS.refreshTokenExpiresAt, now.add(7, 'day').valueOf().toString());
}

/** 读取 accessToken（仅在未过期时返回，否则返回 null 并清理） */
export function getAccessToken(): string | null {
  const token = localStorage.getItem(KEYS.accessToken);
  const expiresAt = localStorage.getItem(KEYS.accessTokenExpiresAt);
  if (token && expiresAt && dayjs().isBefore(Number(expiresAt))) {
    return token;
  }
  clearAuthTokens();
  return null;
}

/** 读取 refreshToken（仅在未过期时返回，否则返回 null 并清理） */
export function getRefreshToken(): string | null {
  const token = localStorage.getItem(KEYS.refreshToken);
  const expiresAt = localStorage.getItem(KEYS.refreshTokenExpiresAt);
  if (token && expiresAt && dayjs().isBefore(Number(expiresAt))) {
    return token;
  }
  clearAuthTokens();
  return null;
}

/** 是否已登录（accessToken 存在且未过期） */
export function isAuthenticated(): boolean {
  return getAccessToken() !== null;
}

/** 清除所有 token 及用户信息 */
export function clearAuthTokens() {
  localStorage.removeItem(KEYS.accessToken);
  localStorage.removeItem(KEYS.accessTokenExpiresAt);
  localStorage.removeItem(KEYS.refreshToken);
  localStorage.removeItem(KEYS.refreshTokenExpiresAt);
  useAuthStore.getState().clearUser();
}
