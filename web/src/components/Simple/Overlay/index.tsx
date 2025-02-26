import {useCallback, useEffect, useRef} from 'react';
import styles from './styles.module.scss';
import {playAnimation} from './animation';

const CONTENT = {
  title: 'Fumeur de C.E',
  description: 'parcours 100 posts',
};

const BADGE_SCROLL = 40000;

const Overlay = () => {
  const ref = useRef<HTMLImageElement>(null);
  const isBadgeRef = useRef(false);

  const handleOnScroll = useCallback(() => {
    if (!ref.current) return;
    if (window.scrollY > BADGE_SCROLL && !isBadgeRef.current) {
      isBadgeRef.current = true;
      playAnimation(ref.current);
    }
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
    </div>
  );
};

export default Overlay;
