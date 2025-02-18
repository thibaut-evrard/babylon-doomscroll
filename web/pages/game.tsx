import { useState, useEffect } from 'react';
import DisplayScreen from '../components/DisplayScreen';
import RunningTrack from '../components/RunningTrack';

const Game: React.FC = () => {
  const [isGameRunning, setIsGameRunning] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(0);

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
      <DisplayScreen time={time} distance={distance} speed={speed} />
      <RunningTrack isRunning={isGameRunning} onScroll={handleScroll} />
      <button onClick={startGame}>Démarrer</button>
      <button onClick={stopGame}>Arrêter</button>
    </div>
  );
};

export default Game;