import React from 'react';
import classnames from 'classnames';
import styles from './ProfilePictureButton.module.css';

export const ProfilePictureButton = ({ image, name, action }) => {
  const profilePicClicked = () => {
    if (action && typeof action === 'function') {
      action();
    }
  };
  return (
    <img
      src={image}
      alt={name}
      onClick={profilePicClicked}
      className={classnames(styles.picture_button)}
    />
  );
};
