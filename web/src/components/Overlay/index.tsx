import {FC, useRef} from 'react';
import styles from './styles.module.scss';
import {useOnScroll} from '@/hooks/useOnScroll';
import Trophy from './Trophy';

import {useGameStore} from '@/store';
import {CONTENT_SERVICE} from '@/config/content';

interface Props {
  onEnd: () => void;
}

const TROPHIES = CONTENT_SERVICE.trophies;

const Overlay: FC<Props> = () => {
  const {trophy, setTrophy} = useGameStore();
  const progressBarRef = useRef<HTMLDivElement>(null);
  const nextTrophyRef = useRef(TROPHIES[0]);

  useOnScroll(() => {
    const nextTrophy = nextTrophyRef.current;
    if (!nextTrophy) return;

    if (progressBarRef.current) {
      const minScroll = trophy?.scroll || 0;
      const maxScroll = nextTrophy.scroll;
      const progress = (window.scrollY - minScroll) / (maxScroll - minScroll);
      progressBarRef.current.style.scale = `1 ${progress}`;
    }

    if (window.scrollY > nextTrophy.scroll) {
      setTrophy(nextTrophyRef.current);
      nextTrophyRef.current = TROPHIES[TROPHIES.indexOf(nextTrophy) + 1];
    }
  }, [trophy]);

  return (
    <div className={styles.overlay_container}>
      <div className={styles.progress} ref={progressBarRef} />
      {trophy && <Trophy content={trophy} key={trophy.title} />}
    </div>
  );
};

export default Overlay;
