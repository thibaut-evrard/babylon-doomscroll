import {cmToPx} from '@/utils/units';

export interface TrophyContent {
  scroll: number;
  title: string;
  image: {
    src: string;
    alt: string;
  };
  description: string;
}

export const TROPHIES = [
  {
    scroll: cmToPx(1000),
    title: 'Techno boomer',
    image: {
      src: '/ce.svg',
      alt: 'Trophy',
    },
    description: 'parcours 100 posts',
  },
  {
    scroll: cmToPx(5000),
    title: 'Technoserf',
    image: {
      src: '/ce.svg',
      alt: 'Trophy',
    },
    description: 'parcours 100 posts',
  },
  {
    scroll: cmToPx(10000),
    title: 'Fumeur de C.E',
    image: {
      src: '/ce.svg',
      alt: 'Trophy',
    },
    description: 'parcours 100 posts',
  },
  {
    scroll: cmToPx(5000),
    title: 'Dopaminomane',
    image: {
      src: '/ce.svg',
      alt: 'Trophy',
    },
    description: 'parcours 100 posts',
  },
];
