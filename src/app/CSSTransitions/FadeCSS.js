import React from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from './FadeCSS.module.css';

export const FadeCSS = ({
  children,
  animateAppear = true,
  animateEnter = true,
  animateExit = true,
}) => {
  return (
    <CSSTransition
      in={true}
      appear={animateAppear}
      enter={animateEnter}
      exit={animateExit}
      timeout={{ enter: 300, exit: 300 }}
      classNames={{ ...styles }}
    >
      {children}
    </CSSTransition>
  );
};
