import { useState, useEffect } from 'react';
import DisplayScreen from '../components/DisplayScreen';
import RunningTrack from '../components/RunningTrack';
import Confetti from 'react-confetti';
import '../styles/globals.css';
import { REWARDS } from '../config/rewardsConfig';

const Game: React.FC = () => {
  const [isGameRunning, setIsGameRunning] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(0);
  const [rewards, setRewards] = useState<string[]>([]);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

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
    const newRewards = REWARDS.filter(reward => distance >= reward.distance).map(reward => reward.name);
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
  };

  const handleScroll = (scrolledDistance: number) => {
    setDistance((prevDistance) => prevDistance + scrolledDistance);
  };

  return (
    <div className="game-container">
      {showConfetti && <Confetti />}
      <DisplayScreen time={time} distance={distance} speed={speed} />
      <RunningTrack isRunning={isGameRunning} onScroll={handleScroll} />
      <button className="button" onClick={startGame}>Démarrer</button>
      <button className="button" onClick={stopGame}>Arrêter</button>
      <div className="rewards-popup">
        {rewards.length > 0 && (
          <div className="rewards-content">
            <h3>Félicitations !</h3>
            <ul>
              {rewards.map((reward, index) => (
                <li key={index}>{reward}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;