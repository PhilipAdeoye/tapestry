import React from 'react';
import styles from './Empty.module.css';
import { Squinty } from './Squinty';

/**
 *
 * @param {string} info Instructional text to show
 * @param {JSX.Element} illustration Any illustration that makes sense for the message
 */
export const Empty = ({
  info,
  illustration = <Squinty message="Nothing here right now" />,
}) => {
  return (
    <div className={styles.empty}>
      {illustration}
      <p className={styles.info}>{info}</p>
    </div>
  );
};
