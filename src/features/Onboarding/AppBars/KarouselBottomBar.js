import React from 'react';

import classnames from 'classnames';
import styles from './KarouselBottomBar.module.css';

export const KarouselBottomBar = ({ left, right }) => {
  return (
    <footer className={styles.footer}>
      <div className={classnames(styles.footer__content, 'container')}>
        <div>{left}</div>
        <div>{right}</div>
      </div>
    </footer>
  );
};
