import {GameStats, GameStatus, Score} from '..';
import {FC, useEffect, useRef, useState} from 'react';
import Threadmill from '../Threadmill';
import {REWARDS} from '@/config/rewardsConfig';
import {useGameStore} from '@/store';

interface Props {
  status: GameStatus;
  onOver: (score: Score) => void;
  onStats: (stats: GameStats) => void;
}

const DoomScrollGame: FC<Props> = ({status, onOver, onStats}) => {
  const {username, achievements, setAchievements} = useGameStore();
  const timeRef = useRef<NodeJS.Timeout | null>(null);
  const [time, setTime] = useState(0);
  const [distance, setDistance] = useState(0);
  const [speed, setSpeed] = useState(0);

  const updateRewards = (newDistance: number) => {
    const newRewards = REWARDS.filter(
      (reward) => newDistance >= reward.distance
    ).map((reward) => reward.name);
    setAchievements(newRewards);
  };

  const handleOnScroll = (newDistance: number) => {
    setDistance(newDistance);
  };

  const startClock = () => {
    timeRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const endGame = () => {
    const title = achievements.at(-1) || '';
    onOver({name: username, distance, title});

    clearInterval(timeRef.current as NodeJS.Timeout);
    setTime(0);
    setDistance(0);
    setSpeed(0);
    setAchievements([]);
  };

  useEffect(() => {
    if (time > 0) {
      // Calculer la vitesse en km/h
      const speedKmh = (distance / time) * 0.36; // Convertir m/s en km/h
      setSpeed(speedKmh);
    }
  }, [time, distance]);

  useEffect(() => {
    onStats({time, distance, speed});
  }, [time, distance, speed]);

  useEffect(() => {
    if (status === GameStatus.PLAYING) {
      startClock();
    } else if (status === GameStatus.OVER) {
      endGame();
    }
  }, [status]);

  useEffect(() => {
    updateRewards(distance);
  }, [distance]);

  return (
    <div>
      <Threadmill
        isRunning={status === GameStatus.PLAYING}
        onScroll={handleOnScroll}
      />
    </div>
  );
};

export default DoomScrollGame;
