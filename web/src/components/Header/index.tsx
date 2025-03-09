import {CONTENT_SERVICE} from '@/config/content';
import {ICONS} from '@/config/media';
import styles from './styles.module.scss';
import Image from 'next/image';

const CONTENT = CONTENT_SERVICE.header;

const Header = () => {
  return (
    <div className={styles.header}>
      <div>
        <h1>{CONTENT_SERVICE.global.title}</h1>
        <p>{CONTENT.description}</p>
      </div>
      <div>
        <p className='label'>{CONTENT.cta}</p>
        <Image
          className={styles.arrow}
          src={ICONS.arrow}
          alt='arrow'
          width={30}
          height={30}
        />
      </div>
    </div>
  );
};

export default Header;
