import React from 'react';
import styles from './Squinty.module.css';
import squinty_blush from '../../images/squinty_blush.png';

export const Squinty = ({ message }) => {
  return (
    <div className={styles.background}>
      <img
        className={styles.squinty}
        src={squinty_blush}
        alt="A blushing emoji with squinty eyes"
      />
      {message && (
        <p className={styles.message}>
          <em>{message}</em>
        </p>
      )}
    </div>
  );
};
