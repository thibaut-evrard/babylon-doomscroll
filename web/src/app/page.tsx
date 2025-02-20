'use client';
import Link from 'next/link';

const CONTENT = {
  title: 'Bienvenue dans Doomscroll',
  img: {
    src: '/start_button.jpg',
    alt: 'Démarrer',
  },
};

const Home: React.FC = () => {
  return (
    <div>
      <h1>{CONTENT.title}</h1>
      <Link href='/game'>
        <img {...CONTENT.img} className='button' />
      </Link>
    </div>
  );
};

export default Home;
