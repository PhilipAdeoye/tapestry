import React from 'react';
import classnames from 'classnames';
import styles from './ProgressDots.module.css';
import { createInclusiveRange } from '../../utils';

export const dotTheme = {
  deepBlue: 'deepBlue',
  grecianBlue: 'grecianBlue',
};

export const ProgressDots = ({ current, max, theme }) => {
  const range = createInclusiveRange(1, max);

  return (
    <div>
      {range.map((i) => (
        <span
          key={`${styles.dot}_${i}`}
          className={classnames(styles.dot, {
            [styles.current]: i === current,
            [styles.grecian_blue]: theme === dotTheme.grecianBlue,
          })}
        ></span>
      ))}
    </div>
  );
};
