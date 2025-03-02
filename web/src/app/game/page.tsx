'use client';
import GameView from '@/components/GameView';
import {useIsMobile} from '@/hooks/useIsMobile';

const GamePage: React.FC = () => {
  const isMobile = useIsMobile();

  if (isMobile === undefined) return;
  if (isMobile === false) return <h1>Mobile only</h1>;
  if (isMobile === true) return <GameView />;
};

export default GamePage;
