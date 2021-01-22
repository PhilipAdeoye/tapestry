import React, { useState } from "react";

import classnames from "classnames";
import styles from "./GiftShopItem.module.css";
import { ViewItemDetailsButton } from "./ViewItemDetailsButton";
import { AddItemToCartButton } from "./AddItemToCartButton";
import { IconContext } from "react-icons/lib";
import { MdFavorite, MdShoppingCart } from "react-icons/md";
import { getInclusiveRandomInteger } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../GiftShopCart/cartSlice";
import { subtractPoints } from "../Rewards/rewardsSlice";
import { showModal } from "../Modal/modalSlice";
import { ItemDetail } from "./ItemDetail";

export const GiftShopItem = ({ id, name, image, price, description = "" }) => {
  // By default the item should hide the item controls
  const [isOpen, setIsOpen] = useState(false);

  // Toggle showing an items action controls when the item is clicked
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  // Use visual themes for items without an image
  const useThemes = !Boolean(image);
  const themes = [
    styles.plaster,
    styles.sunburst,
    styles.deep_blue,
    styles.coral,
  ];
  const [theme] = useState(
    themes[getInclusiveRandomInteger(0, themes.length - 1)]
  );

  // Determine if the user has enough cash to order the item
  const canAddToCart = useSelector((state) => state.rewards.points >= price);

  const qtyInCart = useSelector(
    (state) => state.cart.items.filter((ci) => ci.item_id === id).length
  );
  const isInWishlist = useSelector(
    (state) => state.wishlist.items.filter((wi) => wi.item_id === id).length > 0
  );

  const dispatch = useDispatch();

  return (
    <div className={styles.wrapper}>
      <div
        className={classnames(styles.item, {
          [theme]: useThemes,
          [styles.item__open]: isOpen,
        })}
        onClick={handleClick}
      >
        {/* If the item is in the user's wishlist */}
        {isInWishlist && (
          <div className={styles.wishlist_indicator}>
            <IconContext.Provider value={{ className: styles.icon }}>
              <MdFavorite />
            </IconContext.Provider>
          </div>
        )}

        {/* If an image is provided */}
        {image && <img src={image} alt={name} className={styles.image} />}

        <div className={styles.backdrop}>
          <p>{name}</p>
          <div className={styles.details}>
            <span className={styles.price}>{price}</span>

            {/* If any of this item is in the user's cart */}
            {qtyInCart > 0 && (
              <span className={styles.cart_qty}>
                {/* Show a cart icon */}
                <IconContext.Provider value={{ className: styles.icon }}>
                  <MdShoppingCart />
                </IconContext.Provider>

                {/* Display the actual quantity */}
                <span>{qtyInCart}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action items */}
      <div
        className={classnames({
          [styles.controls__open]: isOpen,
          [styles.controls__closed]: !isOpen,
        })}
      >
        <AddItemToCartButton
          isDisabled={!canAddToCart}
          action={() => {
            if (canAddToCart) {
              const cartItemId = getInclusiveRandomInteger(1, 1000000);
              // Add to cart
              dispatch(
                addToCart({
                  id: cartItemId,
                  name: name,
                  image: image,
                  item_id: id,
                  price: price,
                })
              );

              // Reduce points available
              dispatch(subtractPoints(price));
            }
          }}
        />
        <ViewItemDetailsButton
          action={() => {
            dispatch(
              showModal({
                content: (
                  <ItemDetail
                    name={name}
                    image={image}
                    itemId={id}
                    price={price}
                  />
                ),
              })
            );
          }}
        />
      </div>
    </div>
  );
};
