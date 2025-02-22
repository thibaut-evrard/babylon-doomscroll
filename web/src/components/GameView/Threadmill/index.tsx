import GameInput from '@/components/Three/Scenes/BabylonDoomscroll/GameInput';
import Carpet from './Carpet';
import styles from './styles.module.scss';
import {FC, useEffect, useRef, useState} from 'react';
import UserInput from '@/components/Three/Core/UserInput';

interface Props {
  isRunning: boolean;
  onScroll: (distance: number) => void;
}

const Threadmill: FC<Props> = ({isRunning, onScroll}) => {
  const [distance, setDistance] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const handleMobileScroll = (value: number) => {
    if (!isRunning) return;
    if (value > 0) {
      setDistance((prev) => prev + value);
    }
  };

  useEffect(() => {
    const userInput = new UserInput(document.body);
    const gameInput = new GameInput(userInput);

    gameInput.onScroll = (v) => handleMobileScroll(-v);

    return () => {
      userInput.dispose();
      gameInput.dispose();
    };
  }, [isRunning]);

  useEffect(() => {
    console.log(distance);
    onScroll(distance);
  }, [distance]);

  useEffect(() => {}, [isRunning]);

  return (
    <div className={styles.running_track} ref={trackRef}>
      <img src='/tapis_small.jpg' />
      <Carpet distance={distance} />
    </div>
  );
};

export default Threadmill;
