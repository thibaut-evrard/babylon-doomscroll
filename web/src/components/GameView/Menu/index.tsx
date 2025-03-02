import styles from './styles.module.scss';
import {FC} from 'react';
import {GameStatus} from '..';

interface Props {
  onStart: () => void;
  onEnd: () => void;
  status: GameStatus;
}

const Menu: FC<Props> = ({onStart, onEnd, status}) => {
  return (
    <div className={styles.menu}>
      {status === GameStatus.PLAYING ? (
        <button className='button' onClick={onEnd}>
          Stop
        </button>
      ) : (
        <img
          src='/start_button.jpg'
          alt='Démarrer'
          className='button'
          onClick={onStart}
          style={{cursor: 'pointer'}}
        />
      )}
    </div>
  );
};

export default Menu;
