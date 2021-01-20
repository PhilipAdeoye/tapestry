import React from 'react';
import { RewardPointsChip } from '../../app/Misc/RewardPointsChip';
import styles from './ChancesToEarn.module.css';
import plainContainerStyles from './Containers/PlainContainer.module.css';

export const ChancesToEarn = ({ progressDots }) => {
  return (
    <div className={plainContainerStyles.content_container}>
      <p className={styles.title}>Chances To Earn</p>
      <p className={styles.info}>
        Anytime you see bubbles like the ones below, you have a chance to earn
        those points when you complete the activity
      </p>
      <div className={styles.reward_points_wrapper}>
        <RewardPointsChip points={10} />
        <RewardPointsChip points={15} />
        <RewardPointsChip points={50} />
      </div>
      <div className={styles.progress_dots_container}>{progressDots}</div>
    </div>
  );
};
