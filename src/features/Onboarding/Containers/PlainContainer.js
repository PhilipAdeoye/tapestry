import React from 'react';
import styles from './PlainContainer.module.css';

export const PlainContainer = ({ children }) => {
  return (
    <div className={styles.background}>
      <div className={styles.transparent_head}></div>

      <div className={styles.inner_sheet}>{children}</div>
    </div>
  );
};
