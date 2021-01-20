import React from 'react';
import styles from './PatternContainer.module.css';

export const PatternContainer = ({ children }) => {
  return <div className={styles.background}>{children}</div>;
};
