import React from "react";
import styles from "./RemoveItemPrompt.module.css";
import cart_to_trash from "../../images/cart_to_trash.png";
import { SegmentedButtons } from "../../app/Buttons/SegmentedButtons";
import { useDispatch } from "react-redux";
import { hideModal } from "../Modal/modalSlice";
import { removeAllWithItemId } from "./cartSlice";
import { addPoints } from "../Rewards/rewardsSlice";

export const RemoveItemPrompt = ({ name, itemId, refund }) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <img
          className={styles.image}
          src={cart_to_trash}
          alt="An item being moved from a filled shopping cart into a trash bin"
        />
      </div>
      <p className={styles.message}>Remove {name} from Cart?</p>
      <div className={styles.button_section}>
        <SegmentedButtons
          items={[
            {
              text: "Yes",
              action: () => {
                dispatch(removeAllWithItemId(itemId));
                dispatch(addPoints(refund));
                dispatch(hideModal());
              },
            },
            { text: "No", action: () => dispatch(hideModal()) },
          ]}
        />
      </div>
    </div>
  );
};
