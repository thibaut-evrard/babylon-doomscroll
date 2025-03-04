import {create} from 'zustand';

interface GameStore {
  username: string;
  setUsername: (value: string) => void;
  score: number;
  setScore: (value: number) => void;
  achievements: string[];
  setAchievements: (value: string[]) => void;
}

export const useGameStore = create<GameStore>((set) => ({
  username: '',
  setUsername: (value) => set({username: value}),
  score: 0,
  setScore: (value) => set({score: value}),
  achievements: [],
  setAchievements: (value: string[]) => set({achievements: value}),
}));
