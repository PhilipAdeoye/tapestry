import React from 'react';
import styles from './StatusBar.module.css';
import classnames from 'classnames';

export const StatusBar = ({ children }) => {
  return (
    <footer className={styles.footer}>
      <div className={classnames(styles.footer__content, 'container')}>
        {children}
      </div>
    </footer>
  );
};
