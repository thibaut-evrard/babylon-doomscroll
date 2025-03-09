import {GameStatus, useGameStore} from '@/store';
import styles from './styles.module.scss';

interface Props {
  onPause: () => void;
}

const PlayPauseButton = ({onPause}: Props) => {
  const {status} = useGameStore();
  const isDisabled = status !== GameStatus.RUNNING;

  return (
    <button
      className={styles.playPauseButton}
      disabled={isDisabled}
      onClick={onPause}
    >
      <svg viewBox='0 0 60 60'>
        <circle cx='30' cy='30' r='30'>
          <animate
            attributeName='fill'
            begin='0s'
            dur='2s'
            values='#000;#666;#000'
            repeatCount='indefinite'
          />
        </circle>
        <rect x='20' y='14' width='6' height='34' fill='white' />
        <rect x='35' y='14' width='6' height='34' fill='white' />
      </svg>
    </button>
  );
};

export default PlayPauseButton;
