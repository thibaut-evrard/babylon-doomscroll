import {FC} from 'react';
import {GameStats} from '@/components/GameView';
import styles from './styles.module.scss';

interface Props {
  stats: GameStats;
}

const DisplayScreen: FC<Props> = ({stats}) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(
      2,
      '0'
    )}`;
  };

  return (
    <div className={styles.displayScreen}>
      <div>Temps: {formatTime(stats.time)}</div>
      <div>Distance: {stats.distance.toFixed(2)} m</div>
      <div>Vitesse moy.: {stats.speed.toFixed(2)} km/h</div>
    </div>
  );
};

export default DisplayScreen;
