import { useEffect, useRef } from 'react';
import styles from '../styles/RunningTrack.module.css';

interface RunningTrackProps {
  isRunning: boolean;
  onScroll: (distance: number) => void;
}

const RunningTrack: React.FC<RunningTrackProps> = ({ isRunning, onScroll }) => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (event.deltaY > 0) {
        // Incrémente la distance de 1 mètre à chaque défilement vers le bas
        onScroll(1);
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
      {/* Tapis de course défilant */}
      <div className={styles.runner}></div>
    </div>
  );
};

export default RunningTrack;
