'use client';
import {useCallback, useEffect, useRef} from 'react';
import styles from './styles.module.scss';
import Header from '@/components/Simple/Header';
import Overlay from '@/components/Simple/Overlay';
import {useGameManager} from '@/components/Simple/hooks/useGameManager';
import {SimpleGameStatus, useSimpleStore} from '@/store/simple';
import Takeaway from '@/components/Simple/Takeaway';
import Tiles from '@/components/Simple/Tiles';

const START_SCROLL_THRESHOLD = 100;

const Home: React.FC = () => {
  const game = useGameManager();
  const {status, stats} = useSimpleStore();
  const ref = useRef<HTMLDivElement>(null);

  const handleOnScroll = useCallback(() => {
    if (
      status === SimpleGameStatus.IDLE &&
      window.scrollY > START_SCROLL_THRESHOLD
    ) {
      game.start();
    }
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    window.addEventListener('scroll', handleOnScroll);

    return () => window.removeEventListener('scroll', handleOnScroll);
  }, [status, handleOnScroll]);

  return (
    <>
      <div className={styles.scroll} ref={ref}>
        <Header />
        <Tiles containerRef={ref} />
      </div>
      <Overlay onEnd={game.end} />
      {status === SimpleGameStatus.END && stats && <Takeaway stats={stats} />}
    </>
  );
};

export default Home;
