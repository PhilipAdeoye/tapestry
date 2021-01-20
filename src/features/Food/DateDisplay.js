import React from 'react';
import styles from './DateDisplay.module.css';
import classnames from 'classnames';
import { format } from 'date-fns';

export const dateDisplayThemes = {
  coral: 'coral',
  grecianBlue: 'grecian_blue',
};

export const DateDisplay = ({ date, theme = dateDisplayThemes.coral }) => {
  const dateInMillis = Date.parse(date);
  return (
    <div
      className={classnames(styles.background, {
        [styles.coral]: theme === dateDisplayThemes.coral,
        [styles.grecian_blue]: theme === dateDisplayThemes.grecianBlue,
      })}
    >
      <div className={styles.holes}>
        <span className={styles.hole}></span>
        <span className={styles.hole}></span>
      </div>
      <p className={styles.month}>{format(dateInMillis, 'MMM')}</p>
      <p className={styles.day}>{format(dateInMillis, 'dd')}</p>
    </div>
  );
};
