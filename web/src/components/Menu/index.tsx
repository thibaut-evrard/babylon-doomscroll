import PlayPauseButton from './PlayPauseButton';
import styles from './styles.module.scss';

interface Props {
  onPause: () => void;
}

const Navbar = ({onPause}: Props) => {
  return (
    <section className={styles.navbar}>
      <div className={styles.navbar__content}>
        <PlayPauseButton onPause={onPause} />
      </div>
    </section>
  );
};

export default Navbar;
