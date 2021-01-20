import React from 'react';
import styles from './PackageHeading.module.css';

export const PackageHeading = ({ name, image, packageLabel }) => {
  return (
    <div className={styles.wrapper}>
      <img className={styles.sponsor_image} src={image} alt={name} />

      <div className={styles.sponsor}>
        <p className={styles.package_label}>{packageLabel}</p>
        <p className={styles.sponsor_name}>{`by ${name}`}</p>
      </div>
    </div>
  );
};
