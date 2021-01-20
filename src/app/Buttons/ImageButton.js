import React from 'react';
import styles from './ImageButton.module.css';

export const ImageButton = ({ img, imgAlt, title, subtitle, action }) => {
  const onButtonClicked = () => {
    if (action && typeof action === 'function') {
      action();
    }
  };

  return (
    <button className={styles.button} onClick={onButtonClicked}>
      <img className={styles.image} src={img} alt={imgAlt} />
      <div className={styles.texts}>
        <p className={styles.title}>{title}</p>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
    </button>
  );
};
