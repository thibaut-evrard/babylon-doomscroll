import {useEffect} from 'react';

export const useOnScroll = <T>(callback: () => void, deps: T[]) => {
  useEffect(() => {
    window.addEventListener('scroll', callback);

    return () => window.removeEventListener('scroll', callback);
  }, [...deps, callback]);
};
