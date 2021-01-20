import React from 'react';
import styles from './Sunburst.module.css';

export const Sunburst = ({ children, shouldPopIn = true }) => {
  return <div className={styles.sunburst}>{children}</div>;
};
