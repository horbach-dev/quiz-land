import { buildUrl } from '@/shared/utils/buildUrl';

export const getCurrentImage = (value?: string, loaded?: string) => {
  if (loaded && value && loaded.includes(value)) {
    return buildUrl(loaded);
  }

  if (value) {
    return buildUrl('uploads/temp', value);
  }

  if (loaded) {
    return buildUrl(loaded);
  }

  return null;
};
