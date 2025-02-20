import {GameStats, GameStatus, Score} from '@/app/game/page';
import {FC, useEffect, useRef, useState} from 'react';
import Threadmill from '../Threadmill';
import {REWARDS} from '../../config/rewardsConfig';

interface Props {
  userName: string;
  status: GameStatus;
  onOver: (score: Score) => void;
  onStats: (stats: GameStats) => void;
  onRewards: (rewards: string[]) => void;
}

const DoomScrollGame: FC<Props> = ({
  status,
  userName,
  onOver,
  onStats,
  onRewards,
}) => {
  const timeRef = useRef<NodeJS.Timeout | null>(null);
  const [time, setTime] = useState(0);
  const [distance, setDistance] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [rewards, setRewards] = useState<string[]>([]);

  const updateRewards = (newDistance: number) => {
    console.log(newDistance);
    const newRewards = REWARDS.filter(
      (reward) => newDistance >= reward.distance
    ).map((reward) => reward.name);
    console.log(newRewards);
    setRewards(newRewards);
  };

  const handleOnScroll = (scrolledDistance: number) => {
    setDistance((prevDistance) => prevDistance + scrolledDistance);
  };

  const startClock = () => {
    timeRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const endGame = () => {
    const title = rewards.at(-1) || '';
    onOver({name: userName, distance, title});

    clearInterval(timeRef.current as NodeJS.Timeout);
    setTime(0);
    setDistance(0);
    setSpeed(0);
    setRewards([]);
  };

  useEffect(() => {
    if (time > 0) {
      // Calculer la vitesse en km/h
      const speedKmh = (distance / time) * 3.6; // Convertir m/s en km/h
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
    onRewards(rewards);
  }, [rewards]);

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
