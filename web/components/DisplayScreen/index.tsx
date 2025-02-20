import styles from './styles.module.css';

interface DisplayScreenProps {
  time: number;
  distance: number;
  speed: number;
}

const DisplayScreen: React.FC<DisplayScreenProps> = ({
  time,
  distance,
  speed,
}) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(
      2,
      '0'
    )}`;
  };

  return (
    <div className={styles.displayScreen}>
      <div>Temps: {formatTime(time)}</div>
      <div>Distance: {distance.toFixed(2)} m</div>
      <div>Vitesse moy.: {speed.toFixed(2)} km/h</div>
    </div>
  );
};

export default DisplayScreen;
