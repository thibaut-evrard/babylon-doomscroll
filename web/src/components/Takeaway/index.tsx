import {GameSessionStats, useGameStore} from '@/store';
import styles from './styles.module.scss';
import {FC} from 'react';
import {pxToKm} from '@/utils/units';
import Image from 'next/image';
import {CONTENT_SERVICE} from '@/config/content';

const STATS_CONTENT = CONTENT_SERVICE.stats;

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
          <p>{CONTENT_SERVICE.global.title}</p>
          <button className={styles.close} onClick={onClose}>
            X
          </button>
        </nav>
        <h1>{trophy?.title}</h1>
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
            {STATS_CONTENT.time.prefix}
            <b>{stats.time.toFixed(2)}</b>
            {STATS_CONTENT.time.unit}
          </li>
          <li>
            {STATS_CONTENT.distance.prefix}
            <b>{distanceInKm.toFixed(2)}</b>
            {STATS_CONTENT.distance.unit}
          </li>
          <li>
            {STATS_CONTENT.speed.prefix}
            <b>{speedInKmH.toFixed(2)}</b>
            {STATS_CONTENT.speed.unit}
          </li>
        </ul>
        <button className={styles.takeaway__card__cta} onClick={onShare}>
          {CONTENT_SERVICE.shareable.cta}
        </button>
      </div>
    </div>
  );
};

export default Takeaway;
