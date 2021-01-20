import React from 'react';
import styles from './BriefRSVP.module.css';

export const BriefRSVP = ({ image, name, title }) => {
  return (
    <div className={styles.wrapper}>
      {!!image && <img className={styles.image} src={image} alt={name} />}
      {!image && <div className={styles.image_replacement}></div>}
      <div className={styles.details}>
        <p className={styles.preamble}>{`${name} is going to`}</p>
        <p className={styles.title}>{title}</p>
      </div>
    </div>
  );
};
