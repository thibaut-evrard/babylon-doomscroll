'use client';
import './page.module.scss';
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
    <div className='game__wrapper'>
      <div className='game__view'>
        <div ref={containerRef} className='game__container' />
        <div className='game__overlay'></div>
      </div>
    </div>
  );
};

export default Page;
