import React from 'react';
import styles from './CardInfo.module.css';
import classnames from 'classnames';
import { IconContext } from 'react-icons/lib';

export const CardInfo = ({ text, icon, shouldAnimate = false }) => {
  return (
    <div className={styles.wrapper}>
      <span
        className={classnames(styles.info, {
          [styles.animation]: shouldAnimate,
        })}
      >
        {/* Icon */}
        {icon && (
          <span className={styles.icon_wrapper}>
            <IconContext.Provider value={{ className: styles.icon }}>
              <div>{icon}</div>
            </IconContext.Provider>
          </span>
        )}
        <span>{text}</span>
      </span>
    </div>
  );
};
