import {PropsWithChildren, FC} from 'react';
import styles from './styles.module.scss';

const Overlay: FC<PropsWithChildren> = ({children}) => {
  return <div className={styles.overlay}>{children}</div>;
};

export default Overlay;
