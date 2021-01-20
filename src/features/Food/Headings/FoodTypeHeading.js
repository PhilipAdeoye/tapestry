import React from 'react';
import styles from './FoodTypeHeading.module.css';
import classnames from 'classnames';

export const foodTypeHeadingTheme = {
  default: 'default',
  plaster: 'plaster',
};

export const FoodTypeHeading = ({
  type,
  showCount = true,
  count = null,
  theme = foodTypeHeadingTheme.default,
}) => {
  // Initially, the label can be just the type, e.g,  Meal
  let label = type;

  // If we have a count of how many in the type
  if (count !== null) {
    // We can decide if it's singular or plural, e.g., 'Meal' or 'Meals'
    label = `${count === 1 ? type : `${type}s`}`;

    // If we want to show the count, e.g., '10 Meals' or '1 Meal'
    if (showCount) {
      label = `${count} ${label}`;
    }
  }

  return (
    <>
      {theme === foodTypeHeadingTheme.default && (
        <div className={styles.wrapper}>
          <p className={classnames(styles.label, styles.coral)}>{label}</p>
        </div>
      )}
      {theme === foodTypeHeadingTheme.plaster && (
        <div className={classnames(styles.wrapper, styles.plaster)}>
          <span className={classnames(styles.label, styles.plaster)}>
            {label}
          </span>
        </div>
      )}
    </>
  );
};
