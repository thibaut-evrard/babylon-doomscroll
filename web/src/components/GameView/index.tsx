'use client';
import {useState, useEffect} from 'react';
import Confetti from 'react-confetti';
import DisplayScreen from './DisplayScreen';
import DoomScrollGame from './DoomScrollGame';
import Menu from './Menu';
import Leaderboard from './Leaderboard';

export interface Score {
  name: string;
  distance: number;
  title: string;
}

export enum GameStatus {
  NOT_PLAYED,
  PLAYING,
  OVER,
}

export interface GameStats {
  time: number;
  distance: number;
  speed: number;
}

const GameView: React.FC = () => {
  const [status, setStatus] = useState(GameStatus.NOT_PLAYED);
  const [stats, setStats] = useState<GameStats>({
    time: 0,
    distance: 0,
    speed: 0,
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const [userName, setUserName] = useState('');
  const [scores, setScores] = useState<Score[]>([]);
  const [rewards, setRewards] = useState<string[]>([]);

  const handleOnRewards = (newRewards: string[]) => {
    if (newRewards.length > rewards.length) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
    setRewards(rewards);
  };

  const handleOnOver = (score: Score) => {
    const newScores = [...scores, score] as Score[];
    newScores.sort((a, b) => b.distance - a.distance);
    setScores(newScores);
  };

  const handleOnStats = (stats: GameStats) => {
    setStats(stats);
  };

  useEffect(() => {
    const name = prompt('Veuillez entrer votre blaze :');
    if (name) {
      setUserName(name);
    }
  }, []);

  const startGame = () => {
    setStatus(GameStatus.PLAYING);
  };

  const endGame = () => {
    setStatus(GameStatus.OVER);
  };

  return (
    <div>
      {showConfetti && <Confetti />}
      <div>
        <DisplayScreen stats={stats} />
        <DoomScrollGame
          userName={userName}
          status={status}
          onOver={handleOnOver}
          onStats={handleOnStats}
          onRewards={handleOnRewards}
        />
        <Menu onStart={startGame} onEnd={endGame} status={status} />
      </div>
      {status === GameStatus.OVER && (
        <Leaderboard scores={scores} rewards={rewards} />
      )}
    </div>
  );
};

export default GameView;
