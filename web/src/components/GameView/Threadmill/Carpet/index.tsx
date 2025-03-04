import {FC, useEffect, useState} from 'react';
import styles from './styles.module.scss';

interface Props {
  distance: number;
}

const SPEED = 50;

const Carpet: FC<Props> = ({distance}) => {
  const [style, setStyle] = useState('translateY(0%)');
  useEffect(() => {
    setStyle(`translateY(-${(distance * SPEED) % 50}%)`);
  }, [distance]);

  return (
    <div className={styles.container}>
      <div className={styles.scroller} style={{transform: style}}>
        <img src='/tapis.png' key={1} />
        <img src='/tapis.png' key={2} />
        <img src='/tapis.png' key={3} />
        <img src='/tapis.png' key={4} />
      </div>
    </div>
  );
};

export default Carpet;
