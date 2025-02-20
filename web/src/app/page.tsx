'use client';
import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <div className='home-container'>
      <h1>Bienvenue dans Doomscroll</h1>
      <Link href='/game'>
        <img
          src='/start_button.jpg'
          alt='Démarrer'
          className='button'
          style={{cursor: 'pointer'}}
        />
      </Link>
    </div>
  );
};

export default Home;
