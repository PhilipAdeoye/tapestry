import React from 'react';
import styles from './MainContainer.module.css';
import { FadeCSS } from '../CSSTransitions/FadeCSS';

export const MainContainer = ({ children }) => {
  return (
    <FadeCSS>
      <div className={styles.foundation}>
        <div className={styles.container}>{children}</div>
      </div>
    </FadeCSS>
  );
};
