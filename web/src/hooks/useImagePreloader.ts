import {useEffect} from 'react';

export const useImagePreloader = (medias: Record<string, string>) => {
  useEffect(() => {
    for (const src of Object.values(medias)) {
      const img = new Image();
      img.src = src;
    }
  }, []);
};
