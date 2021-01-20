import React from 'react';
import styles from './Card.module.css';
import { IconContext } from 'react-icons/lib';

export const Card = ({ children }) => {
  return <div className={styles.background}>{children}</div>;
};

export const CardImage = ({ src, alt }) => {
  return <img className={styles.image} src={src} alt={alt} />;
};

export const CardImageIllustration = ({ icon }) => {
  return (
    <div className={styles.illustration}>
      <IconContext.Provider value={{ className: styles.illustration__icon }}>
        {icon}
      </IconContext.Provider>
    </div>
  );
};

export const CardSectionDivider = () => {
  return <hr className={styles.divider} />;
};
