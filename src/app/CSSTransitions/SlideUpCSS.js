import React from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from './SlideUpCSS.module.css';

export const SlideUpCSS = ({
  children,
  animateAppear = true,
  animateEnter = true,
}) => {
  return (
    <CSSTransition
      in={true}
      appear={animateAppear}
      enter={animateEnter}
      timeout={{ enter: 350, exit: 350 }}
      classNames={{ ...styles }}
    >
      {children}
    </CSSTransition>
  );
};
