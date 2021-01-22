import React, { useState } from "react";
import { MdChevronRight } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  buttonKind,
  iconPosition,
  IconTextButton,
} from "../../app/Buttons/IconTextButton";
import { StackedButtons } from "../../app/Buttons/StackedButtons";
import { createInclusiveRange } from "../../utils";
import { updateCart } from "../Food/foodSlice";
import { hideModal } from "../Modal/modalSlice";
import styles from "./UpdateQuantityPrompt.module.css";

export const UpdateQuantityPrompt = ({ item, initialQty, maxQty }) => {
  let range = createInclusiveRange(0, maxQty);

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
    //If the user picked a diffent number of items than they started out with
    if (qty !== initialQty) {
      // Add to cart
      dispatch(
        updateCart({
          id: item.itemId,
          count: qty,
        })
      );
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
