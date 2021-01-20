import React from 'react';
import classnames from 'classnames';
import styles from './Modal.module.css';
import { ModalCloseButton } from './ModalCloseButton';
import { disappear, hide, visibilityStates } from './modalSlice';
import { useDispatch, useSelector } from 'react-redux';

export const Modal = () => {
  const dispatch = useDispatch();
  const visibility = useSelector((state) => state.modal.visibility);
  const bodyContent = useSelector((state) => state.modal.content);

  const onBackdropClick = (event) => {
    if ([...event.target.classList].includes(styles.backdrop)) {
      dispatch(hide());
    }
  };

  const onModalAnimationEnd = () => {
    if (visibility === visibilityStates.hide) {
      dispatch(disappear());
    }
  };

  return (
    <div
      onClick={onBackdropClick}
      onAnimationEnd={onModalAnimationEnd}
      className={classnames(styles.backdrop, {
        [styles.backdrop_show]: visibility === visibilityStates.show,
        [styles.backdrop_hide]: visibility === visibilityStates.hide,
      })}
    >
      <div
        className={classnames(styles.content, {
          [styles.content_show]: visibility === visibilityStates.show,
          [styles.content_hide]: visibility === visibilityStates.hide,
        })}
      >
        <div className={classnames(styles.header, 'container')}>
          <ModalCloseButton />
        </div>
        <div className={classnames(styles.body, 'container')}>
          {bodyContent}
        </div>
      </div>
    </div>
  );
};
