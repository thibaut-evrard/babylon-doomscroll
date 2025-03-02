import {ChangeEvent, FC} from 'react';
import styles from './styles.module.scss';
import {useGameStore} from '@/store/game';

interface Props {
  onStartGame: () => void;
}

const CONTENT = {
  title: 'Babylon Doomscroll',
  description: `Deviens le meilleur scrolleur de l'ère technoféodale`,
  namePrompt: 'Quel est ton nom technoserf?',
};

const IntroView: FC<Props> = ({onStartGame}) => {
  const {setUsername} = useGameStore();

  const handleOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setUsername(evt.target.value);
  };

  return (
    <div className={styles.game_intro}>
      <section>
        <h1>{CONTENT.title}</h1>
        <p>{CONTENT.description}</p>
      </section>
      <section>
        <p>{CONTENT.namePrompt}</p>
        <input type='text' onChange={handleOnChange} />
        <button onClick={onStartGame}>SCROLL!</button>
      </section>
    </div>
  );
};

export default IntroView;
