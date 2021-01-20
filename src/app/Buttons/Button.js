import React from 'react';
import styles from './Buttons.module.css';
import classnames from 'classnames';

export const buttonKind = {
  default: `${styles.btn_default}`,
  primary: `${styles.btn_primary}`,
};

export const buttonType = {
  button: 'button',
  submit: 'submit',
  reset: 'reset',
};

export const Button = ({
  type = buttonType.button,
  kind = buttonKind.default,
  label,
  action,
}) => {
  return (
    <button
      type={type}
      className={classnames(styles.btn, kind)}
      onClick={action}
    >
      {label}
    </button>
  );
};
