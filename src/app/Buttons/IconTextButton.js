import React from 'react';
import styles from './IconTextButton.module.css';
import iconButtonStyles from './IconButton.module.css';
import classnames from 'classnames';
import { IconContext } from 'react-icons';

export const iconPosition = {
  left: 'left',
  right: 'right',
};

export const buttonKind = {
  default: 'default',
  primary: 'primary',
};

export const IconTextButton = ({
  icon,
  label,
  action,
  extraBtnStyles,
  position,
  kind,
  useLargeBtn = false,
  useIconBackground = true,
}) => {
  // Add classes to style the button: large? primary or default?
  const buttonClass = classnames(styles.icon_text_btn, {
    [styles.large]: useLargeBtn,
    [styles.default]: kind === buttonKind.default,
    [styles.primary]: kind === buttonKind.primary,
  });

  // Add classes to style the button content: icon on the left or right?
  const contentClass = classnames(styles.content, {
    [styles.icon_right]: position === iconPosition.right,
  });

  // Add classes to style the icon container: For a large button?
  const iconContainerSizingClass = classnames(styles.icon, {
    [styles.with_bg]: useIconBackground,
    [styles.large]: useLargeBtn,
  });

  // Add classes to position the text and icon with adequate padding: large button? left or right?
  const textPositionClass = classnames(styles.text, {
    [styles.large]: useLargeBtn,
    [styles.icon_right]: position === iconPosition.right,
  });

  return (
    <button
      type="button"
      onClick={action}
      style={extraBtnStyles}
      className={buttonClass}
    >
      <div className={contentClass}>
        <div className={iconContainerSizingClass}>
          <IconContext.Provider
            value={{ className: iconButtonStyles.icon_btn__icon }}
          >
            {icon}
          </IconContext.Provider>
        </div>
        <div className={textPositionClass}>{label}</div>
      </div>
    </button>
  );
};
