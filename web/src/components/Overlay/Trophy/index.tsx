import Image from 'next/image';
import {playAnimation} from './animation';
import styles from './styles.module.scss';
import {FC, useEffect, useRef} from 'react';

interface Props {
  content: {
    title: string;
    description: string;
    image: {
      src: string;
      alt: string;
    };
  };
  onAnimationEnd?: () => void;
}

const Trophy: FC<Props> = ({content, onAnimationEnd}) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    playAnimation(ref.current, () => {
      if (onAnimationEnd) onAnimationEnd();
    });
  }, [content, onAnimationEnd]);

  return (
    <div className={styles.trophy} ref={ref}>
      <h1>{content.title}</h1>
      <Image
        src={content.image.src}
        alt={content.image.alt}
        width={500}
        height={500}
      />
      <p>{content.description}</p>
    </div>
  );
};

export default Trophy;
