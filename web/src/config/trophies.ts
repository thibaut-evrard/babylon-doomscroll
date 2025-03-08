import {mToPx} from '@/utils/units';
import {BADGES} from './sources';

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
    scroll: mToPx(1),
    title: 'Michel le Berger',
    image: {
      src: BADGES.michelBerger,
      alt: 'Trophy',
    },
    description: 'Les brebis avant le scroll',
  },
  {
    scroll: mToPx(5),
    title: 'Mamie',
    image: {
      src: BADGES.mamie,
      alt: 'Trophy',
    },
    description: `Ecris comment scroller sur un bout de papier`,
  },
  {
    scroll: mToPx(10),
    title: 'Esprit libre',
    image: {
      src: BADGES.technoEspritLibre,
      alt: 'Trophy',
    },
    description: `Le scroll c'est babylone, man`,
  },
  {
    scroll: mToPx(20),
    title: 'Bon Français',
    image: {
      src: BADGES.bonFrancais,
      alt: 'Trophy',
    },
    description: `Embrasse la tradition`,
  },
  {
    scroll: mToPx(30),
    title: 'Dopaminomane',
    image: {
      src: BADGES.dopaminomane,
      alt: 'Trophy',
    },
    description: `Essaye de finir instagram sur la toilettte`,
  },
  {
    scroll: mToPx(40),
    title: 'Tech Bro',
    image: {
      src: BADGES.technoBro,
      alt: 'Trophy',
    },
    description: `Scroll l'arche de la défence`,
  },
  {
    scroll: mToPx(50),
    title: 'Techno CEO',
    image: {
      src: BADGES.technoCeo,
      alt: 'Trophy',
    },
    description: `Le capitalisme a papa`,
  },
  {
    scroll: mToPx(60),
    title: 'Fumeur de CE',
    image: {
      src: BADGES.fumeurDeCe,
      alt: 'Trophy',
    },
    description: `Embrasse la modernité`,
  },
  {
    scroll: mToPx(70),
    title: 'Moine du scroll',
    image: {
      src: BADGES.moineDuScroll,
      alt: 'Trophy',
    },
    description: `Le scroll comme religion`,
  },
  {
    scroll: mToPx(80),
    title: 'Techno chevalier',
    image: {
      src: BADGES.technoChevalier,
      alt: 'Trophy',
    },
    description: `Adoubé de l'ère Technoféodale`,
  },
  {
    scroll: mToPx(90),
    title: 'Techno Lord',
    image: {
      src: BADGES.technoKing,
      alt: 'Trophy',
    },
    description: `Manage des clusters Kubernetes`,
  },
  {
    scroll: mToPx(100),
    title: 'Esprit Technoféodal',
    image: {
      src: BADGES.technoEsprit,
      alt: 'Trophy',
    },
    description: `L'empereur du cloud`,
  },
];
