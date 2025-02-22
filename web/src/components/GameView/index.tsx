'use client';
import styles from './styles.module.scss';
import {useState, useEffect} from 'react';
import Confetti from 'react-confetti';
import DisplayScreen from './DisplayScreen';
import DoomScrollGame from './DoomScrollGame';
import Menu from './Menu';
import Leaderboard from './Leaderboard';
import {useGameStore} from '@/store';
import IntroView from './IntroView';
import Overlay from '../Layout/Overlay';

export interface Score {
  name: string;
  distance: number;
  title: string;
}

export enum GameStatus {
  NOT_PLAYED = 'not-played',
  PLAYING = 'playing',
  OVER = 'game-over',
}

export interface GameStats {
  time: number;
  distance: number;
  speed: number;
}

const GameView: React.FC = () => {
  const {achievements} = useGameStore();
  const [status, setStatus] = useState(GameStatus.NOT_PLAYED);
  const [stats, setStats] = useState<GameStats>({
    time: 0,
    distance: 0,
    speed: 0,
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const [scores, setScores] = useState<Score[]>([]);

  const handleOnOver = (score: Score) => {
    const newScores = [...scores, score] as Score[];
    newScores.sort((a, b) => b.distance - a.distance);
    setScores(newScores);
  };

  const handleOnStartGame = () => {
    setStatus(GameStatus.PLAYING);
  };

  const handleOnStats = (stats: GameStats) => {
    setStats(stats);
  };

  const startGame = () => {
    setStatus(GameStatus.PLAYING);
  };

  const endGame = () => {
    setStatus(GameStatus.OVER);
  };

  useEffect(() => {
    if (achievements.length > 0) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [achievements]);

  console.log(status);

  return (
    <div>
      {showConfetti && <Confetti />}
      <div className={styles.game__container}>
        <DisplayScreen stats={stats} />
        <DoomScrollGame
          status={status}
          onOver={handleOnOver}
          onStats={handleOnStats}
        />
        <Menu onStart={startGame} onEnd={endGame} status={status} />
      </div>
      {status === GameStatus.OVER && (
        <Overlay>
          <Leaderboard scores={scores} rewards={achievements} />
        </Overlay>
      )}
      {status === GameStatus.NOT_PLAYED && (
        <Overlay>
          <IntroView onStartGame={handleOnStartGame} />
        </Overlay>
      )}
    </div>
  );
};

export default GameView;
