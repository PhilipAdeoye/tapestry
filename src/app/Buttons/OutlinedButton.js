import React from 'react';
import classnames from 'classnames';
import styles from './OutlinedButton.module.css';
import iconButtonStyles from './IconButton.module.css';
import { IconContext } from 'react-icons/lib';

export const OutlinedButton = ({
  text,
  icon,
  action,
  shrinkOnSmallScreens = false,
  hideTextOnSmallScreens = false,
}) => {
  const handleClick = () => {
    if (action && typeof action === 'function') {
      action();
    }
  };

  return (
    <button
      type="button"
      className={classnames(styles.button, {
        [styles.shrink]: shrinkOnSmallScreens,
      })}
      onClick={handleClick}
    >
      <span
        className={classnames(styles.text, {
          [styles.hidden]: hideTextOnSmallScreens,
        })}
      >
        {text}
      </span>
      <IconContext.Provider
        value={{ className: iconButtonStyles.icon_btn__icon }}
      >
        {icon}
      </IconContext.Provider>
    </button>
  );
};
