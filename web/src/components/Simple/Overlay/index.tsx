import {FC, useEffect, useRef, useState} from 'react';
import styles from './styles.module.scss';
import EndCta from './EndCta';
import {useOnScroll} from '@/hooks/useOnScroll';
import Trophy from './Trophy';
import {TROPHIES} from '@/config/trophies';
import {useSimpleStore} from '@/store/simple';

interface Props {
  onEnd: () => void;
}

const SCROLL_CHECK_INTERVAL = 500;

const Overlay: FC<Props> = ({onEnd}) => {
  const {trophy, setTrophy} = useSimpleStore();
  const progressBarRef = useRef<HTMLDivElement>(null);
  const previousScrollRef = useRef(0);
  const nextTrophyRef = useRef(TROPHIES[0]);
  const [isStationary, setIsStationary] = useState(false);

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

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.scrollY < 1000) return;
      if (previousScrollRef.current === window.scrollY) {
        setIsStationary(true);
      } else {
        setIsStationary(false);
      }
      previousScrollRef.current = window.scrollY;
    }, SCROLL_CHECK_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.overlay_container}>
      <div className={styles.progress} ref={progressBarRef} />
      {trophy && <Trophy content={trophy} />}
      <EndCta isVisible={isStationary} onClick={onEnd} />
    </div>
  );
};

export default Overlay;
