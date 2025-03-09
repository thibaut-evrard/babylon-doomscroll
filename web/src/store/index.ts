import {CONTENT_SERVICE} from '@/config/content';
import {TrophyContent} from '@/config/trophies';
import {create} from 'zustand';

export enum GameStatus {
  IDLE = 'IDLE',
  RUNNING = 'RUNNING',
  END = 'END',
}

export interface GameSessionStats {
  time: number;
  distance: number;
  averageSpeed: number;
}

interface GameStore {
  trophy: TrophyContent | null;
  setTrophy: (trophy: TrophyContent) => void;
  status: GameStatus;
  setStatus: (status: GameStatus) => void;
  stats: GameSessionStats | null;
  setStats: (stats: GameSessionStats) => void;
}

export const useGameStore = create<GameStore>((set) => ({
  trophy: null,
  setTrophy: (trophy) => set({trophy}),
  status: GameStatus.IDLE,
  setStatus: (status) => set({status}),
  stats: null,
  setStats: (stats) => set({stats}),
}));
