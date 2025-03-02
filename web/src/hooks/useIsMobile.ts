import {useEffect, useState} from 'react';

const MOBILE_PX_MIN_WIDTH = 600;

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  const updateIsMobile = () => {
    setIsMobile(window.innerWidth < MOBILE_PX_MIN_WIDTH);
  };
  useEffect(() => {
    window.addEventListener('resize', updateIsMobile);
    updateIsMobile();
    return () => window.removeEventListener('resize', updateIsMobile);
  }, []);

  return isMobile;
};
