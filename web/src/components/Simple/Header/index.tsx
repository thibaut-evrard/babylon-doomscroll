import styles from './styles.module.scss';

const CONTENT = {
  title: 'Babylon Doomscroll',
  description: `Scroll sans relâche pour devenir un Technolord et te dresser au-dessus des Technoserfs. Pousse tes limites toujours plus loin et impose ta domination dans ce royaume technoféodal, où seule la persévérance fait le maître !`,
  cta: 'Scroll et deviens un technolord',
};

const Header = () => {
  return (
    <div className={styles.header}>
      <div>
        <h1>{CONTENT.title}</h1>
        <p>{CONTENT.description}</p>
      </div>
      <div>
        <p className='label'>{CONTENT.cta}</p>
        <img className={styles.arrow} src='/arrow.svg' alt='arrow' />
      </div>
    </div>
  );
};

export default Header;
