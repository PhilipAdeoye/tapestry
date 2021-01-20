import React, { useState } from 'react';
import { IconContext } from 'react-icons/lib';
import { MdExpandMore } from 'react-icons/md';
import styles from './CartItem.module.css';
import iconButtonStyles from '../../app/Buttons/IconButton.module.css';
import { getInclusiveRandomInteger } from '../../utils';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { show } from '../Modal/modalSlice';
import { UpdateQuantityPrompt } from './UpdateQuantityPrompt';

export const CartItem = ({ name, image, qty, itemId }) => {
  // Use visual themes for items without an image
  const useThemes = !Boolean(image);
  const themes = [styles.plaster, styles.sunburst, styles.deep_blue];
  const [theme] = useState(
    themes[getInclusiveRandomInteger(0, themes.length - 1)]
  );

  const dispatch = useDispatch();

  // Use the package to determine the maximum cart size
  const menuItems = useSelector((state) => state.food.package.items);
  const maxCartSize = menuItems.reduce((acc, item) => acc + item.count, 0);

  // Use the cart to determine the current cart size
  const cartItems = useSelector((state) => state.food.cart.items);
  const currentCartSize = cartItems.reduce((acc, item) => acc + item.count, 0);

  let maxQty = qty + (maxCartSize - currentCartSize);

  const handleQuantityBtnClick = () => {
    dispatch(
      show({
        content: (
          <UpdateQuantityPrompt
            item={{ name, image, itemId }}
            initialQty={qty}
            maxQty={maxQty}
          />
        ),
      })
    );
  };

  return (
    <div className={styles.wrapper}>
      {/* If the item doesn't have an image, use a styled text description instead */}
      {useThemes ? (
        <div
          className={classnames(styles.image_substitute, {
            [theme]: useThemes,
          })}
        ></div>
      ) : (
        <img src={image} alt={name} className={styles.image} />
      )}

      {/* Section to manage the cart item */}
      <div className={styles.details}>
        <p className={classnames(styles.controls, styles.name)}>{name}</p>
        <div className={styles.controls}>
          <span>Items</span>
          <button
            className={styles.qty_button}
            title="Choose How Many"
            onClick={handleQuantityBtnClick}
          >
            <span className={styles.qty_display}>{qty}</span>
            <IconContext.Provider
              value={{ className: iconButtonStyles.icon_btn__icon }}
            >
              <MdExpandMore />
            </IconContext.Provider>
          </button>
        </div>
      </div>
    </div>
  );
};
