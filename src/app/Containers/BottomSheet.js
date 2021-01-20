import React from 'react';
import styles from './BottomSheet.module.css';

const BottomSheet = ({ title, children }) => {
  return (
    <div className={styles.background}>
      {title && (
        <div className={styles.heading}>
          <p>{title}</p>
        </div>
      )}
      {children}
    </div>
  );
};

export default BottomSheet;
