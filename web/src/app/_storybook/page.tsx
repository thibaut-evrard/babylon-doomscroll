'use client';
import styles from './page.module.scss';
import ThreeContainer from '@/components/Three/Container';
import BabylonDoomscroll from '@/components/Three/Scenes/BabylonDoomscroll';
import {useThree} from '@/hooks/useThree';
import {useEffect, useState} from 'react';

const Page = () => {
  const [scene, setScene] = useState<ThreeContainer | null>(null);
  const {containerRef} = useThree(scene);

  useEffect(() => {
    setScene(new BabylonDoomscroll());
  }, []);

  return (
    <div className={styles.game__wrapper}>
      <div className={styles.game__view}>
        <div ref={containerRef} className={styles.game__container} />
        <div className={styles.game__overlay}></div>
      </div>
    </div>
  );
};

export default Page;
