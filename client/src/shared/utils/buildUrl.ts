import { BASE_URL } from '@/shared/constants';

export function buildUrl(...parts: string[]) {
  const clean = parts.filter(Boolean).map((p) => p.replace(/^\/+|\/+$/g, ''));

  const finalPath = clean.join('/');
  return new URL(finalPath, BASE_URL).toString();
}
