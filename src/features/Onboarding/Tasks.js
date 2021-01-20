import React from 'react';
import styles from './Tasks.module.css';
import patternContainerStyles from './Containers/PatternContainer.module.css';

export const Tasks = ({ image, imgAlt, text, progressDots }) => {
  return (
    <div className={patternContainerStyles.content_container}>
      <img src={image} alt={imgAlt} className={styles.big_picture} />
      <p className={styles.info}>{text}</p>
      <div className={styles.progress_dots_container}>{progressDots}</div>
    </div>
  );
};
