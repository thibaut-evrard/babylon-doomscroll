import {FC, useCallback, useEffect, useRef, useState} from 'react';
import styles from './styles.module.scss';
import {playAnimation} from './animation';
import EndCta from './EndCta';

interface Props {
  onEnd: () => void;
}

const CONTENT = {
  title: 'Fumeur de C.E',
  description: 'parcours 100 posts',
};

const BADGE_SCROLL = 40000;
const SCROLL_CHECK_INTERVAL = 500;

const Overlay: FC<Props> = ({onEnd}) => {
  const ref = useRef<HTMLImageElement>(null);
  const isBadgeRef = useRef(false);
  const previousScrollRef = useRef(0);
  const [isStationary, setIsStationary] = useState(false);

  const handleOnScroll = useCallback(() => {
    if (!ref.current) return;
    if (window.scrollY > BADGE_SCROLL && !isBadgeRef.current) {
      isBadgeRef.current = true;
      playAnimation(ref.current);
    }
  }, []);

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

  useEffect(() => {
    if (!ref.current) return;
    window.addEventListener('scroll', handleOnScroll);

    return () => window.removeEventListener('scroll', handleOnScroll);
  }, [handleOnScroll]);

  return (
    <div className={styles.overlay_container}>
      <div className={styles.overlay_animation} ref={ref}>
        <h1>{CONTENT.title}</h1>
        <img src='/ce.svg' />
        <p>{CONTENT.description}</p>
      </div>
      <EndCta isVisible={isStationary} onClick={onEnd} />
    </div>
  );
};

export default Overlay;
