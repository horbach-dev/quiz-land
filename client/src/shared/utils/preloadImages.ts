import { buildUrl } from '@/shared/utils/buildUrl';

export function preloadImages(urls, callback) {
  let loadedCount = 0;
  let errorCount = 0;
  const total = urls.length;

  urls.forEach(function(url) {
    const img = new Image();

    img.onload = () => {
      loadedCount++;
      if (loadedCount + errorCount === total) callback();
    };

    img.onerror = () => {
      errorCount++;
      if (loadedCount + errorCount === total) callback();
    };

    img.src = buildUrl(url);
  });
}
