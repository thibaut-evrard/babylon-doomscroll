'use client';
import {useCallback, useEffect, useRef, useState} from 'react';
import styles from './styles.module.scss';
import Header from '@/components/Simple/Header';
import Overlay from '@/components/Simple/Overlay';

const MIN_REMAINING_SCROLL = 5000;
const TILE_BATCH = Array.from(Array(20).keys()).fill(1);

const Home: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [tiles, setTiles] = useState([...TILE_BATCH]);

  const handleOnScroll = useCallback(() => {
    if (!ref.current) return;
    const remainingScroll = ref.current.clientHeight - window.scrollY;
    if (remainingScroll < MIN_REMAINING_SCROLL) {
      setTiles((prev) => [...prev, ...TILE_BATCH]);
    }
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    window.addEventListener('scroll', handleOnScroll);

    return () => window.removeEventListener('scroll', handleOnScroll);
  }, []);

  return (
    <>
      <div className={styles.scroll} ref={ref}>
        <Header />
        {tiles.map((_, index) => (
          <div key={index} className={styles.tile}>
            <h1>{index + 1}</h1>
          </div>
        ))}
      </div>
      <Overlay />
    </>
  );
};

export default Home;
