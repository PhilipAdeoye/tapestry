import React from 'react';
import { MdChevronRight } from 'react-icons/md';
import {
  buttonKind,
  iconPosition,
  IconTextButton,
} from '../../../app/Buttons/IconTextButton';

export const NextButton = ({ action, alternateLabel }) => {
  return (
    <IconTextButton
      icon={<MdChevronRight />}
      label={alternateLabel ? alternateLabel : 'NEXT'}
      position={iconPosition.right}
      kind={buttonKind.primary}
      action={() => {
        action();
      }}
    />
  );
};
