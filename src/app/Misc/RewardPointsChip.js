import React from 'react';
import styles from './RewardPointsChip.module.css';

export const RewardPointsChip = ({ points }) => {
  return (
    <div className={styles.points}>
      <p>+{points}</p>
    </div>
  );
};
