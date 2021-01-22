import React, { useState } from "react";
import { IconContext } from "react-icons/lib";
import { MdClose, MdExpandMore } from "react-icons/md";
import { IconButton, iconButtonThemes } from "../../app/Buttons/IconButton";
import styles from "./CartItem.module.css";
import iconButtonStyles from "../../app/Buttons/IconButton.module.css";
import { getInclusiveRandomInteger } from "../../utils";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../Modal/modalSlice";
import { RemoveItemPrompt } from "./RemoveItemPrompt";
import { UpdateQuantityPrompt } from "./UpdateQuantityPrompt";

export const CartItem = ({ name, image, price, qty, itemId }) => {
  // Use visual themes for items without an image
  const useThemes = !Boolean(image);
  const themes = [styles.plaster, styles.sunburst, styles.deep_blue];
  const [theme] = useState(
    themes[getInclusiveRandomInteger(0, themes.length - 1)]
  );

  const dispatch = useDispatch();
  const handleRemoveFromCartClick = () => {
    const refund = price * qty;
    dispatch(
      showModal({
        content: (
          <RemoveItemPrompt name={name} itemId={itemId} refund={refund} />
        ),
      })
    );
  };

  const availablePoints = useSelector((state) => state.rewards.points);
  const currentPointsInCartForItem = price * qty;
  const maxPointsSpendableOnItem = currentPointsInCartForItem + availablePoints;

  let maxQty = parseInt(maxPointsSpendableOnItem / price, 10);

  const handleQuantityBtnClick = () => {
    dispatch(
      showModal({
        content: (
          <UpdateQuantityPrompt
            item={{ name, image, price, itemId }}
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
        >
          <p>{name}</p>
        </div>
      ) : (
        <img src={image} alt={name} className={styles.image} />
      )}

      {/* Section to manage the cart item */}
      <div className={styles.details}>
        <div className={styles.controls}>
          <span className={styles.price}>{price}</span>
          <IconButton
            title="Remove from Cart"
            icon={<MdClose />}
            theme={iconButtonThemes.smallCoralOutlined}
            action={handleRemoveFromCartClick}
          />
        </div>
        <div className={styles.controls}>
          <span>Quantity</span>
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
