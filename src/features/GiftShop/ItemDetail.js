import React from "react";
import styles from "./ItemDetail.module.css";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { DisclosureButtonGroup } from "../../app/Buttons/DisclosureButtonGroup";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { addToWishlist, removeFromWishlistWithItemId } from "./wishlistSlice";

export const ItemDetail = ({ name, image, price, itemId }) => {
  const qtyInCart = useSelector(
    (state) => state.cart.items.filter((ci) => ci.item_id === itemId).length
  );

  const isInWishlist = useSelector(
    (state) =>
      state.wishlist.items.filter((wi) => wi.item_id === itemId).length > 0
  );
  const dispatch = useDispatch();

  return (
    <div className={classnames(styles.container, "row")}>
      {image && (
        <div className="col-xs-4 col-lg-4">
          <img
            src={image}
            alt={name}
            className={classnames(styles.image, "img-responsive")}
          />
        </div>
      )}
      <div className="col-xs-4 col-lg-4">
        <p className={styles.name}>{name}</p>
        <p>
          <span className={styles.price}>{price.toLocaleString()}</span>
          {qtyInCart > 0 && (
            <span className={styles.qty_in_cart}>{qtyInCart} in your cart</span>
          )}
        </p>
        <div className={styles.action_buttons_wrapper}>
          <DisclosureButtonGroup
            items={[
              {
                text: isInWishlist ? "Remove from Wishlist" : "Put in Wishlist",
                icon: isInWishlist ? <MdFavorite /> : <MdFavoriteBorder />,
                useCoralIcon: isInWishlist,
                hideDisclosureIcon: true,
                action: () => {
                  if (isInWishlist) {
                    dispatch(removeFromWishlistWithItemId(itemId));
                  } else {
                    dispatch(
                      addToWishlist({
                        name,
                        image,
                        price,
                        item_id: itemId,
                      })
                    );
                  }
                },
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
