'use client';
import styles from './page.module.scss';
import {useState, useEffect} from 'react';
import Confetti from 'react-confetti';
import DisplayScreen from '../../../components/DisplayScreen';
import Threadmill from '../../../components/Threadmill';
import {REWARDS} from '../../../config/rewardsConfig';
import Leaderboard from '../../../components/Leaderboard';

export interface Score {
  name: string;
  distance: number;
  title: string;
}

const Game: React.FC = () => {
  const [isGameRunning, setIsGameRunning] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(0);
  const [rewards, setRewards] = useState<string[]>([]);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const [scores, setScores] = useState<Score[]>([]);

  useEffect(() => {
    const name = prompt('Veuillez entrer votre blaze :');
    if (name) {
      setUserName(name);
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGameRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isGameRunning]);

  useEffect(() => {
    if (time > 0) {
      // Calculer la vitesse en km/h
      const speedKmh = (distance / time) * 3.6; // Convertir m/s en km/h
      setSpeed(speedKmh);
    }
  }, [time, distance]);

  useEffect(() => {
    updateRewards(distance);
  }, [distance]);

  const updateRewards = (distance: number) => {
    const newRewards = REWARDS.filter(
      (reward) => distance >= reward.distance
    ).map((reward) => reward.name);
    if (newRewards.length > rewards.length) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
    setRewards(newRewards);
  };

  const startGame = () => {
    setIsGameRunning(true);
  };

  const stopGame = () => {
    setIsGameRunning(false);
    const title = rewards.length > 0 ? rewards[rewards.length - 1] : undefined;
    const newScores = [...scores, {name: userName, distance, title}];
    newScores.sort((a, b) => b.distance - a.distance); // Trier les scores par distance décroissante
    setScores(newScores);
    setTime(0);
    setDistance(0);
    setSpeed(0);
    setRewards([]);
  };

  const handleScroll = (scrolledDistance: number) => {
    setDistance((prevDistance) => prevDistance + scrolledDistance);
  };

  return (
    <div className={styles.game_container}>
      {showConfetti && <Confetti />}

      <div>
        <DisplayScreen time={time} distance={distance} speed={speed} />
        <Threadmill isRunning={isGameRunning} onScroll={handleScroll} />
        <div className='button-container'>
          <img
            src='/start_button.jpg'
            alt='Démarrer'
            className='button'
            onClick={startGame}
            style={{cursor: 'pointer'}}
          />
          <button className='button' onClick={stopGame}>
            Stop
          </button>
        </div>
      </div>
      <Leaderboard scores={scores} rewards={rewards} />
    </div>
  );
};

export default Game;
