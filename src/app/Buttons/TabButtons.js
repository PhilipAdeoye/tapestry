import React from 'react';
import styles from './TabButtons.module.css';
import classnames from 'classnames';
import { createInclusiveRange } from '../../utils';

export const TabButtons = ({ items, isFixedPositioned = true }) => {
  const keys = createInclusiveRange(1, items.length);
  return (
    <div
      className={classnames(styles.container, {
        [styles.fixed]: isFixedPositioned,
      })}
    >
      <div className={classnames('container', styles.wrapper)}>
        <div className={classnames(styles.content)}>
          {items.map((item, index) => (
            <button
              key={keys[index]}
              className={classnames(styles.button, {
                [styles.active]: item.isActive,
              })}
              onClick={() => {
                if (item.action && typeof item.action === 'function') {
                  item.action();
                }
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
