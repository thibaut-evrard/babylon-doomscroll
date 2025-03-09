'use client';
import {useRef} from 'react';
import styles from './styles.module.scss';
import Header from '@/components/Header';
import Overlay from '@/components/Overlay';
import {useGameManager} from '@/hooks/useGameManager';
import {GameStatus, useGameStore} from '@/store';
import Takeaway from '@/components/Takeaway';
import Tiles from '@/components/Tiles';
import {useOnScroll} from '@/hooks/useOnScroll';
import {useImagePreloader} from '@/hooks/useImagePreloader';
import {BADGES} from '@/config/media';

const START_SCROLL_THRESHOLD = 100;

const Home: React.FC = () => {
  const game = useGameManager();
  const {status, stats} = useGameStore();
  const ref = useRef<HTMLDivElement>(null);
  useImagePreloader(BADGES);

  useOnScroll(() => {
    if (status === GameStatus.IDLE && window.scrollY > START_SCROLL_THRESHOLD) {
      game.start();
    }
  }, []);

  return (
    <>
      <div className={styles.scroll} ref={ref}>
        <Header />
        <Tiles containerRef={ref} />
      </div>
      <Overlay onEnd={game.end} />
      {status === GameStatus.END && stats && <Takeaway stats={stats} />}
    </>
  );
};

export default Home;
