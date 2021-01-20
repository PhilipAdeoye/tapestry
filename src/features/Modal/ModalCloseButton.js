import React from 'react';
import { MdClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import {
  buttonKind,
  iconPosition,
  IconTextButton,
} from '../../app/Buttons/IconTextButton';
import { hide } from './modalSlice';

export const ModalCloseButton = () => {
  const dispatch = useDispatch();
  return (
    <IconTextButton
      icon={<MdClose />}
      label="CLOSE"
      position={iconPosition.left}
      kind={buttonKind.default}
      action={() => {
        dispatch(hide());
      }}
    />
  );
};
