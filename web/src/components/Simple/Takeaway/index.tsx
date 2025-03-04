import {SimpleGameStats} from '@/store/simple';
import styles from './styles.module.scss';
import {FC} from 'react';
import {pxToKm} from '@/utils/units';

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
  const timeInH = stats.time / 3600;
  const distanceInKm = pxToKm(stats.distance);
  const speedInKmH = distanceInKm / timeInH;

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
            {CONTENT.stats.distance} <b>{distanceInKm.toFixed(2)}km</b>
          </li>
          <li>
            {CONTENT.stats.speed} <b>{speedInKmH.toFixed(2)}km/h</b>
          </li>
        </ul>
        <button onClick={onShare}>{CONTENT.cta}</button>
      </div>
    </div>
  );
};

export default Takeaway;
