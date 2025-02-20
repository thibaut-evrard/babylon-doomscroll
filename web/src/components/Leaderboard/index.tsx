import styles from './index.module.scss';
import {Score} from '@/app/game/page';
import {FC} from 'react';

interface Props {
  scores: Score[];
  rewards: string[];
}

const CONTENT = {
  title: 'Hall of Fame',
  rewards: 'Titres débloqués',
};

const Leaderboard: FC<Props> = ({scores, rewards}) => {
  return (
    <div>
      <div className={styles.score_board}>
        <h3>{CONTENT.title}</h3>
        <ul>
          {scores.map((score, index) => (
            <li key={index}>
              {score.name}: {score.distance} m{' '}
              {score.title && `(${score.title})`}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.rewards_popup}>
        {rewards.length > 0 && (
          <div className={styles.rewards_content}>
            <h3>{CONTENT.rewards}</h3>
            <ul>
              {rewards.map((reward, index) => (
                <li key={index}>{reward}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
