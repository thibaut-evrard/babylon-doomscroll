import {GameStatus} from '@/app/game/page';
import {FC} from 'react';

interface Props {
  onStart: () => void;
  onEnd: () => void;
  status: GameStatus;
}

const Menu: FC<Props> = ({onStart, onEnd, status}) => {
  return (
    <div className='button-container'>
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
