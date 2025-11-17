import { createDirectus, rest, staticToken } from '@directus/sdk';

const STATIC_ADMIN_TOKEN = import.meta.env.VITE_DIRECTUS_TOKEN
const DOMAIN = import.meta.env.VITE_DIRECTUS_URL

export const directus = createDirectus(DOMAIN)
  .with(staticToken(STATIC_ADMIN_TOKEN))
  .with(rest());
