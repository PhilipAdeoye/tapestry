import React from 'react';

import classnames from 'classnames';
import styles from './AppBar.module.css';

export const AppBar = ({ left, right }) => {
  return (
    <header className={styles.header}>
      <div className={classnames(styles.header__content, 'container')}>
        {left}
        {right}
      </div>
    </header>
  );
};
