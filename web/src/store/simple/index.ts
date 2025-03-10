import {TrophyContent} from '@/config/trophies';
import {create} from 'zustand';

export enum SimpleGameStatus {
  IDLE = 'IDLE',
  RUNNING = 'RUNNING',
  END = 'END',
}

export interface SimpleGameStats {
  time: number;
  distance: number;
  averageSpeed: number;
}

interface SimpleStore {
  trophy: TrophyContent | null;
  setTrophy: (trophy: TrophyContent) => void;
  status: SimpleGameStatus;
  setStatus: (status: SimpleGameStatus) => void;
  stats: SimpleGameStats | null;
  setStats: (stats: SimpleGameStats) => void;
}

export const useSimpleStore = create<SimpleStore>((set) => ({
  trophy: null,
  setTrophy: (trophy) => set({trophy}),
  status: SimpleGameStatus.IDLE,
  setStatus: (status) => set({status}),
  stats: null,
  setStats: (stats) => set({stats}),
}));
