import React from 'react';
import styles from './ProgressBar.module.css';
import classnames from 'classnames';

export const ProgressBar = ({ currentValue, maxValue, useBoldText = true }) => {
  return (
    <div
      className={classnames(styles.container, {
        [styles.bold_text]: useBoldText,
      })}
    >
      <div className={styles.background}>
        <div
          className={classnames(styles.progress, {
            [styles.zero_progress]: currentValue === 0,
          })}
          style={{ width: `${(currentValue / maxValue) * 100}%` }}
        >
          <span className={styles.current_value}>{currentValue}</span>
        </div>
      </div>
      <span className={styles.max_value}>{maxValue}</span>
    </div>
  );
};
