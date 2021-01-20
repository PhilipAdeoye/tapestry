import React from 'react';
import styles from './MinorHeading.module.css';
import classnames from 'classnames';

export const MinorHeading = ({ text, boldText = false }) => {
  return (
    <p className={classnames(styles.text, { [styles.bold]: boldText })}>
      <span className={styles.orange}></span> <span>{text}</span>
    </p>
  );
};
