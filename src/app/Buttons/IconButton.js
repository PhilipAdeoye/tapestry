import React from 'react';
import styles from './IconButton.module.css';
import classnames from 'classnames';
import { IconContext } from 'react-icons';

export const iconButtonThemes = {
  default: 'default',
  plaster: 'plaster',
  smallCoralOutlined: 'coral_outlined',
};

export const IconButton = ({
  icon,
  title,
  action,
  isDisabled,
  theme = iconButtonThemes.default,
}) => {
  return (
    <button
      type="button"
      className={classnames(styles.icon_btn, {
        [styles.plaster]: theme === iconButtonThemes.plaster,
        [styles.coral_outlined]: theme === iconButtonThemes.smallCoralOutlined,
      })}
      title={title}
      onClick={action}
      disabled={isDisabled}
    >
      <IconContext.Provider value={{ className: styles.icon_btn__icon }}>
        {icon}
      </IconContext.Provider>
    </button>
  );
};
