import React from 'react';
import { MdShoppingCart } from 'react-icons/md';
import { IconButton } from '../../app/Buttons/IconButton';

export const AddItemToCartButton = ({ action, isDisabled }) => {
  const handleClick = () => {
    if (action && typeof action === 'function') {
      action();
    }
  };
  return (
    <IconButton
      title="Add Item to Cart"
      icon={<MdShoppingCart />}
      action={handleClick}
      isDisabled={isDisabled}
    />
  );
};
