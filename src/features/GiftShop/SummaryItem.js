import React, { useState } from 'react';
import styles from './SummaryItem.module.css';
import classnames from 'classnames';
import { getInclusiveRandomInteger } from '../../utils';

export const SummaryItem = ({ id, name, image, qty, cost }) => {
  // Use visual themes for items without an image
  const useThemes = !Boolean(image);
  const themes = [styles.sunburst, styles.deep_blue, styles.coral];
  const [theme] = useState(
    themes[getInclusiveRandomInteger(0, themes.length - 1)]
  );

  return (
    <div className={styles.wrapper}>
      {useThemes ? (
        <div className={classnames(styles.image, theme)}></div>
      ) : (
        <img className={styles.image} src={image} alt={name} />
      )}

      <div className={styles.details}>
        <span>{name}</span>
        <div className={styles.meta}>
          <span>x{qty}</span>
          <span className={styles.item_total}>{cost}</span>
        </div>
      </div>
    </div>
  );
};
