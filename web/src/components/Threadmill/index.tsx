import Carpet from './Carpet';
import styles from './styles.module.css';
import {FC, useEffect, useRef, useState} from 'react';

interface Props {
  isRunning: boolean;
  onScroll: (distance: number) => void;
}

const Threadmill: FC<Props> = ({isRunning, onScroll}) => {
  const [distance, setDistance] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onScroll(distance);
  }, [distance]);

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (event.deltaY > 0) {
        // Incrémente la distance de 1 mètre à chaque défilement vers le bas
        setDistance((prev) => prev + event.deltaY / 100);
      }
    };

    if (isRunning && trackRef.current) {
      trackRef.current.addEventListener('wheel', handleScroll);
    }

    return () => {
      if (trackRef.current) {
        trackRef.current.removeEventListener('wheel', handleScroll);
      }
    };
  }, [isRunning, onScroll]);

  return (
    <div className={styles.runningTrack} ref={trackRef}>
      <Carpet distance={distance} />
    </div>
  );
};

export default Threadmill;
