import gsap from 'gsap';
import {FC, useEffect, useRef} from 'react';
import styles from './styles.module.scss';

interface Props {
  isVisible: boolean;
  onClick: () => void;
}

const CONTENT = {
  title: 'Fini de scrollax?',
  cta: 'voire stats',
};

const EndCta: FC<Props> = ({isVisible, onClick}) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isVisible) {
      gsap.to(ref.current, {
        opacity: 1,
        scale: 1,
        duration: 1,
        y: '0px',
        ease: 'back.out',
      });
    } else {
      gsap.to(ref.current, {
        opacity: 0,
        scale: 0,
        duration: 0.3,
        y: '50px',
        ease: 'power2.in',
      });
    }
  }, [isVisible]);

  return (
    <div className={styles.end_container} ref={ref}>
      <h2>{CONTENT.title}</h2>
      <button onClick={onClick}>{CONTENT.cta}</button>
    </div>
  );
};

export default EndCta;
