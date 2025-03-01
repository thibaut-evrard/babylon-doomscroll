import styles from './styles.module.scss';

const CONTENT = {
  title: 'Scroll du matin',
  stats: {
    time: 'temps: ',
    distance: 'distance: ',
    speed: 'vitesse moyenne: ',
  },
  cta: 'Partager sur linkedin',
};

const Takeaway = () => {
  return (
    <div className={styles.takeaway}>
      <div className={styles.takeaway__card}>
        <button className={styles.close}>X</button>
        <h1>{CONTENT.title}</h1>
        <ul className='text__medium'>
          <li>{CONTENT.stats.time}</li>
          <li>{CONTENT.stats.distance}</li>
          <li>{CONTENT.stats.speed}</li>
        </ul>
        <button>{CONTENT.cta}</button>
      </div>
    </div>
  );
};

export default Takeaway;
