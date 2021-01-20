import React from 'react';
import styles from './JoinMethod.module.css';
import classnames from 'classnames';

export const JoinMethod = ({
  image,
  altText,
  text,
  action,
  isSelected = true,
}) => {
  const handleClick = () => {
    if (action && typeof action === 'function') {
      action();
    }
  };

  return (
    <div className={styles.item_wrapper}>
      <button type="button" className={styles.background} onClick={handleClick}>
        {/* Selection Indicator */}
        <div className={styles.indicator_container}>
          <div
            className={classnames(styles.indicator, {
              [styles.selected]: isSelected,
            })}
          ></div>
        </div>

        {/* Picture */}
        <img className={styles.image} src={image} alt={altText} />

        {/* Text */}
        <p className={styles.text}>{text}</p>
      </button>
    </div>
  );
};
