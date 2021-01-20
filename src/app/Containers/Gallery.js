import React from 'react';
import styles from './Gallery.module.css';
import classnames from 'classnames';

export const Gallery = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export const columnOptions = {
  four: 'four',
  two: 'two',
  one: 'one',
};

export const GalleryItem = ({ children, maxColumns = columnOptions.four }) => {
  return (
    <div
      className={classnames(styles.item_wrapper, {
        [styles.one]: maxColumns === columnOptions.one,
        [styles.two]: maxColumns === columnOptions.two,
        [styles.four]: maxColumns === columnOptions.four,
      })}
    >
      {children}
    </div>
  );
};
