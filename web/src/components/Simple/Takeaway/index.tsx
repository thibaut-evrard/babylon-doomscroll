import {SimpleGameStats} from '@/store/simple';
import styles from './styles.module.scss';
import {FC} from 'react';

const CONTENT = {
  title: 'Scroll du matin',
  stats: {
    time: 'temps: ',
    distance: 'distance: ',
    speed: 'vitesse moyenne: ',
  },
  cta: 'Partager sur linkedin',
};

interface Props {
  stats: SimpleGameStats;
  onClose?: () => void;
  onShare?: () => void;
}

const Takeaway: FC<Props> = ({stats, onClose, onShare}) => {
  return (
    <div className={styles.takeaway}>
      <div className={styles.takeaway__card}>
        <button className={styles.close} onClick={onClose}>
          X
        </button>
        <h1>{CONTENT.title}</h1>
        <ul className='text__medium'>
          <li>
            {CONTENT.stats.time} <b>{stats.time.toFixed(2)}s</b>
          </li>
          <li>
            {CONTENT.stats.distance} <b>{stats.distance.toFixed(2)}Kpx</b>
          </li>
          <li>
            {CONTENT.stats.speed} <b>{stats.averageSpeed.toFixed(2)}Kpx/s</b>
          </li>
        </ul>
        <button onClick={onShare}>{CONTENT.cta}</button>
      </div>
    </div>
  );
};

export default Takeaway;
