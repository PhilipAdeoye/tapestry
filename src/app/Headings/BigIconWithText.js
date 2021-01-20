import React from 'react';
import styles from './BigIconWithText.module.css';

export const BigIconWithText = ({ image, imgAlt, text }) => {
  return (
    <div className={styles.wrapper}>
      <img className={styles.image} alt={imgAlt} src={image} />
      <span className={styles.text}>{text}</span>
    </div>
  );
};
