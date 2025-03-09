import {GameStatus, useGameStore} from '@/store';
import {useRef} from 'react';

export const useGameManager = () => {
  const {setStatus, setStats} = useGameStore();
  const timeRef = useRef<number>(0);

  const start = () => {
    setStatus(GameStatus.RUNNING);
    timeRef.current = performance.now();
  };

  const end = () => {
    setStatus(GameStatus.END);
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
