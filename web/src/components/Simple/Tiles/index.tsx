import {useOnScroll} from '@/hooks/useOnScroll';
import styles from './styles.module.scss';
import {useState, FC} from 'react';

interface Props {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const TILE_BATCH = Array.from(Array(20).keys()).fill(1);
const MIN_REMAINING_SCROLL = 5000;

const Tiles: FC<Props> = ({containerRef}) => {
  const [tiles, setTiles] = useState([...TILE_BATCH]);

  useOnScroll(() => {
    if (!containerRef.current) return;
    const remainingScroll = containerRef.current.clientHeight - window.scrollY;
    if (remainingScroll < MIN_REMAINING_SCROLL) {
      setTiles((prev) => [...prev, ...TILE_BATCH]);
    }
  }, [containerRef]);

  return (
    <>
      {tiles.map((_, index) => (
        <div key={index} className={styles.tile}>
          <h1>{(index + 1) / 10}m</h1>
        </div>
      ))}
    </>
  );
};

export default Tiles;
