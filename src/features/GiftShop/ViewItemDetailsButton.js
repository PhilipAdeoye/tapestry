import React from 'react';
import { MdList } from 'react-icons/md';
import { IconButton } from '../../app/Buttons/IconButton';

export const ViewItemDetailsButton = ({ action, isDisabled }) => {
  const handleClick = () => {
    if (action && typeof action === 'function') {
      action();
    }
  };
  return (
    <IconButton
      title="View Details"
      icon={<MdList />}
      action={handleClick}
      isDisabled={isDisabled}
    />
  );
};
