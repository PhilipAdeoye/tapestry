import React from 'react';
import { useDispatch } from 'react-redux';
import { show } from '../../features/Modal/modalSlice';
import { HelpInfo } from '../HelpInfo';
import { Button, buttonType, buttonKind } from './Button';

export const HelpButton = () => {
  const dispatch = useDispatch();

  return (
    <Button
      label="HELP"
      kind={buttonKind.default}
      type={buttonType.button}
      action={() => {
        dispatch(show({ content: <HelpInfo /> }));
      }}
    />
  );
};
