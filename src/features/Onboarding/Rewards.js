import React from 'react';
import styles from './Rewards.module.css';
import plainContainerStyles from './Containers/PlainContainer.module.css';

export const Rewards = ({
  title,
  image,
  imgAlt,
  pointsReward,
  text,
  progressDots,
}) => {
  return (
    <div className={plainContainerStyles.content_container}>
      <p className={styles.title}>{title}</p>
      <div className={styles.big_picture_wrapper}>
        <img src={image} alt={imgAlt} className={styles.big_picture} />
        {pointsReward && (
          <div className={styles.points_reward_coin}>
            <p className={styles.points_reward_text}>+{pointsReward}</p>
          </div>
        )}
      </div>
      <p className={styles.info}>{text}</p>
      <div className={styles.progress_dots_container}>{progressDots}</div>
    </div>
  );
};
