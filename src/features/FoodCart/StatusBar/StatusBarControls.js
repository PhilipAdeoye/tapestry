import React from 'react';
import styles from './StatusBarControls.module.css';
import { useHistory } from 'react-router-dom';
import shopping_cart from '../../../images/shopping_cart.svg';
import { useDispatch, useSelector } from 'react-redux';
import { ProgressBar } from '../../../app/Misc/ProgressBar';
import { show } from '../../Modal/modalSlice';
import { SelectionConfirmation } from '../../Food/SelectionConfirmation';
import { OutlinedButton } from '../../../app/Buttons/OutlinedButton';
import { MdArrowForward } from 'react-icons/md';

export const StatusBarControls = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  // Use the package to determine the maximum cart size
  const menuItems = useSelector((state) => state.food.package.items);
  const maxCartSize = menuItems.reduce((acc, item) => acc + item.count, 0);

  // Use the cart to determine the current cart size
  const cartItems = useSelector((state) => state.food.cart.items);
  const currentCartSize = cartItems.reduce((acc, item) => acc + item.count, 0);

  const cartIsFull = currentCartSize === maxCartSize;

  return (
    <div className={styles.container}>
      <div>
        <img
          className={styles.shopping_cart}
          src={shopping_cart}
          alt="Filled up shopping cart"
        />
      </div>
      <div className={styles.progress_area}>
        <ProgressBar currentValue={currentCartSize} maxValue={maxCartSize} />
      </div>
      {cartIsFull && (
        <OutlinedButton
          text="Done"
          icon={<MdArrowForward />}
          action={() => {
            history.push('/food');
            dispatch(show({ content: <SelectionConfirmation /> }));
          }}
        />
      )}
    </div>
  );
};
