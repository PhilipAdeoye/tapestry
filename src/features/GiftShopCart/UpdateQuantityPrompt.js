import React, { useState } from "react";
import { MdChevronRight } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  buttonKind,
  iconPosition,
  IconTextButton,
} from "../../app/Buttons/IconTextButton";
import { StackedButtons } from "../../app/Buttons/StackedButtons";
import { createInclusiveRange, getInclusiveRandomInteger } from "../../utils";
import { hideModal } from "../Modal/modalSlice";
import { addPoints, subtractPoints } from "../Rewards/rewardsSlice";
import { addToCart, removeAllWithItemId } from "./cartSlice";
import styles from "./UpdateQuantityPrompt.module.css";

export const UpdateQuantityPrompt = ({ item, initialQty, maxQty }) => {
  const MAX_NUMBER_OF_BUTTONS = 5;
  let range = [];

  //   If the user has put more into their cart than we want to show buttons for
  if (initialQty > MAX_NUMBER_OF_BUTTONS) {
    range = createInclusiveRange(1, MAX_NUMBER_OF_BUTTONS - 1);
    range.push(initialQty);
  }
  //   If they don't have enough points to afford the max number
  else if (maxQty <= MAX_NUMBER_OF_BUTTONS) {
    range = createInclusiveRange(1, maxQty);
  } else {
    range = createInclusiveRange(1, MAX_NUMBER_OF_BUTTONS);
  }

  //   Keep track of the user's selection
  const [qty, setQty] = useState(initialQty);

  const numbers = range.map((num) => {
    return {
      text: num,
      action: () => {
        setQty(num);
      },
      isSelected: qty === num,
    };
  });

  const dispatch = useDispatch();

  const handleConfirmBtnClick = () => {
    //   If the user picked a diffent number of items than they started out with
    if (qty !== initialQty) {
      // Phase 1: Blow away current cart items
      // calculate how many points they have spent on the item so far
      const refund = item.price * initialQty;
      //   remove current items
      dispatch(removeAllWithItemId(item.itemId));
      //   refund the spent points
      dispatch(addPoints(refund));

      //   Phase 2: Spend points to get to newly selected quantity
      for (let i = 0; i < qty; i++) {
        // Add to cart
        dispatch(
          addToCart({
            id: getInclusiveRandomInteger(1, 1000000),
            name: item.name,
            image: item.image,
            item_id: item.itemId,
            price: item.price,
          })
        );
        // Reduce points available
        dispatch(subtractPoints(item.price));
      }
    }
    dispatch(hideModal());
  };

  return (
    <div className={styles.container}>
      <p className={styles.message}>Pick How Many</p>
      <div className={styles.button_section}>
        <StackedButtons items={numbers} />
      </div>
      <p className={styles.confirm}>
        <IconTextButton
          icon={<MdChevronRight />}
          label={"OK"}
          position={iconPosition.right}
          kind={buttonKind.primary}
          action={handleConfirmBtnClick}
        />
      </p>
    </div>
  );
};
