import React from "react";
import styles from "./StatusBarControls.module.css";
import { useHistory, useLocation } from "react-router-dom";
import { PlaceOrderButton } from "./PlaceOrderButton";
import { ProfilePic } from "./ProfilePic";
import { useSelector } from "react-redux";
import { IconButton, iconButtonThemes } from "../../../app/Buttons/IconButton";
import { MdArrowForward, MdShoppingCart } from "react-icons/md";
import { OutlinedButton } from "../../../app/Buttons/OutlinedButton";

export const StatusBarControls = () => {
  const location = useLocation();
  const history = useHistory();

  // Available points
  const points = useSelector((state) => state.rewards.points);

  // Count of items in cart
  const itemsInCart = useSelector((state) => state.cart.items.length);

  // Total cost of items in cart
  const pointsSpent = useSelector((state) =>
    state.cart.items.reduce((acc, i) => acc + i.price, 0)
  );

  // If on the checkout page
  const readyToCheckout = location.pathname.indexOf("checkout") > -1;

  return (
    <div className={styles.container}>
      {/* Display user profile pic and points available to spend */}
      <div className={styles.cash_area}>
        <ProfilePic />
        <div className={styles.points_area}>
          <p className={styles.points}>{points.toLocaleString()}</p>
          <p className={styles.unit}>Points</p>
        </div>
      </div>

      {/* If on the checkout page, show the Place Order Button */}
      {readyToCheckout ? (
        <PlaceOrderButton />
      ) : (
        <>
          {/* Otherwise, show the cart and checkout buttons */}
          {/* Cart Area */}
          <div className={styles.cart_area}>
            <IconButton
              title="View Cart"
              icon={<MdShoppingCart />}
              theme={iconButtonThemes.plaster}
              action={() => history.push("/giftshop/cart")}
            />
            <div className={styles.points_area}>
              <p className={styles.points}>{pointsSpent.toLocaleString()}</p>
              <p className={styles.unit}>
                <span>{itemsInCart}</span>
                {itemsInCart === 1 ? " item" : " items"}
              </p>
            </div>
          </div>

          {/* Checkout Button */}
          {itemsInCart > 0 && (
            <OutlinedButton
              text="Checkout"
              icon={<MdArrowForward />}
              action={() => history.push("/giftshop/checkout")}
              shrinkOnSmallScreens={true}
              hideTextOnSmallScreens={true}
            />
          )}
        </>
      )}
    </div>
  );
};
