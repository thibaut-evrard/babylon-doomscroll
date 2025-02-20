import {FC} from 'react';

interface Props {
  onStart: () => void;
  onEnd: () => void;
}

const Menu: FC<Props> = ({onStart, onEnd}) => {
  return (
    <div className='button-container'>
      <img
        src='/start_button.jpg'
        alt='Démarrer'
        className='button'
        onClick={onStart}
        style={{cursor: 'pointer'}}
      />
      <button className='button' onClick={onEnd}>
        Stop
      </button>
    </div>
  );
};

export default Menu;
