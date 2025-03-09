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
  const activeTrophy = trophy || CONTENT_SERVICE.trophies[0];
  const timeInH = stats.time / 3600;
  const distanceInKm = pxToKm(stats.distance);
  const speedInKmH = distanceInKm / timeInH;

  return (
    <div className={styles.takeaway__backdrop}>
      <div className={styles.takeaway__card}>
        <div className={styles.takeaway__card__shine} />
        <nav>
          <p>{CONTENT_SERVICE.global.title}</p>
          <button onClick={onClose}>ⓧ</button>
        </nav>
        <div className={styles.takeaway__card__trophy}>
          <h2>{activeTrophy.title}</h2>
          <i>{activeTrophy.description}</i>
          {trophy && (
            <Image
              src={activeTrophy.image.src}
              alt={activeTrophy.image.alt}
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
        </div>
      </div>
      <button className={styles.takeaway__card__cta} onClick={onShare}>
        {CONTENT_SERVICE.shareable.cta}
      </button>
    </div>
  );
};

export default Takeaway;
