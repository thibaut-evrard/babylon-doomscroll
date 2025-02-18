import Link from 'next/link';
import '../styles/globals.css';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h1>Bienvenue dans Doomscroll</h1>
      <Link href="/game">
        <button>C'est ici pour scroller</button>
      </Link>
    </div>
  );
};
export default Home;
