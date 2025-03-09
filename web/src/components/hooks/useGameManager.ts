import {SimpleGameStatus, useSimpleStore} from '@/store';
import {useRef} from 'react';

export const useGameManager = () => {
  const {setStatus, setStats} = useSimpleStore();
  const timeRef = useRef<number>(0);

  const start = () => {
    setStatus(SimpleGameStatus.RUNNING);
    timeRef.current = performance.now();
  };

  const end = () => {
    setStatus(SimpleGameStatus.END);
    const time = (performance.now() - timeRef.current) / 1000;
    const distance = window.scrollY;
    const averageSpeed = distance / time;

    setStats({
      time,
      distance,
      averageSpeed,
    });
  };

  return {
    start,
    end,
  };
};
