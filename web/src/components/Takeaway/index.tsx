import {GameSessionStats, useGameStore} from '@/store';
import styles from './styles.module.scss';
import {FC} from 'react';
import {pxToKm} from '@/utils/units';
import Image from 'next/image';

const CONTENT = {
  title: 'Scroll du matin',
  nav: {
    title: 'TECHNOFÉODAL DOOMSCROLL',
  },
  stats: {
    time: 'temps: ',
    distance: 'distance: ',
    speed: 'vitesse: ',
  },
  cta: 'Partager',
};

interface Props {
  stats: GameSessionStats;
  onClose?: () => void;
  onShare?: () => void;
}

const Takeaway: FC<Props> = ({stats, onClose, onShare}) => {
  const {trophy} = useGameStore();
  const timeInH = stats.time / 3600;
  const distanceInKm = pxToKm(stats.distance);
  const speedInKmH = distanceInKm / timeInH;

  return (
    <div className={styles.takeaway}>
      <div className={styles.takeaway__card}>
        <nav>
          <p>{CONTENT.nav.title}</p>
          <button className={styles.close} onClick={onClose}>
            X
          </button>
        </nav>
        <h1>{trophy ? trophy.title : CONTENT.title}</h1>
        {trophy && (
          <Image
            src={trophy.image.src}
            alt={trophy.image.alt}
            width={500}
            height={500}
          />
        )}
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
        <button className={styles.takeaway__card__cta} onClick={onShare}>
          {CONTENT.cta}
        </button>
      </div>
    </div>
  );
};

export default Takeaway;
