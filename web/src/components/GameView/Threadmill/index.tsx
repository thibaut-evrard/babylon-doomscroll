import GameInput from '@/components/Three/Scenes/BabylonDoomscroll/GameInput';
import Carpet from './Carpet';
import styles from './styles.module.scss';
import {FC, useEffect, useRef, useState} from 'react';
import UserInput from '@/components/Three/Core/UserInput';

interface Props {
  isRunning: boolean;
  onScroll: (distance: number) => void;
}

const SCROLL_SPEED = 0.001;

const Threadmill: FC<Props> = ({isRunning, onScroll}) => {
  const [distance, setDistance] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const handleMobileScroll = (value: number) => {
    if (!isRunning) return;
    if (value > 0) {
      setDistance((prev) => prev + value * SCROLL_SPEED);
    }
  };

  useEffect(() => {
    if (!trackRef.current) return;
    const userInput = new UserInput(trackRef.current);
    const gameInput = new GameInput(userInput);

    gameInput.onScroll = (v) => handleMobileScroll(-v);

    return () => {
      userInput.dispose();
      gameInput.dispose();
    };
  }, [isRunning]);

  useEffect(() => {
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
