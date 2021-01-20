import React from 'react';
import { MdChevronLeft } from 'react-icons/md';
import {
  buttonKind,
  iconPosition,
  IconTextButton,
} from '../../../app/Buttons/IconTextButton';

export const BackButton = ({ action }) => {
  return (
    <IconTextButton
      icon={<MdChevronLeft />}
      label="BACK"
      position={iconPosition.left}
      kind={buttonKind.default}
      useIconBackground={false}
      action={() => {
        action();
      }}
    />
  );
};
