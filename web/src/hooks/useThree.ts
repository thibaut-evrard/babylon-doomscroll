import ThreeContainer from '@/components/Three/Container';
import {useEffect, useRef} from 'react';

export const useThree = (scene: ThreeContainer | null) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !scene) return;
    scene.init(containerRef.current);

    return () => {
      scene.dispose();
    };
  }, [scene]);

  return {
    containerRef,
  };
};
