import React from 'react';
import styles from './Body.module.css';
import classnames from 'classnames';

export const Body = ({ children }) => {
  return <div className={classnames('container', styles.body)}>{children}</div>;
};
