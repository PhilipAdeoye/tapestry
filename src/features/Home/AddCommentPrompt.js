import React, { useState } from "react";
import { MdChevronRight } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  buttonKind,
  iconPosition,
  IconTextButton,
} from "../../app/Buttons/IconTextButton";
import { StackedButtons } from "../../app/Buttons/StackedButtons";
import { hideModal } from "../Modal/modalSlice";
import styles from "./AddCommentPrompt.module.css";
import { addComment } from "./feedSlice";

/**
 *
 * @param {JSX.Element} item
 * @param {Number} itemId - The id of the item to add the comment to
 * @param {string} type - The type of comment
 * @param {Number} userId - The user's id
 * @param {string} userName - The user's name
 * @param {string} imageURL - The user's profile pic
 * @param {Array} cannedComments - An array of strings
 */
export const AddCommentPrompt = ({
  item,
  itemId,
  type,
  userId,
  userName,
  imageURL,
  cannedComments = [],
}) => {
  const dispatch = useDispatch();
  //   Keep track of the user's selection
  const [choice, setChoice] = useState("");

  const options = cannedComments.map((comment) => {
    return {
      text: comment,
      action: () => {
        setChoice(comment);
      },
      isSelected: choice === comment,
    };
  });

  const handleConfirmBtnClick = () => {
    if (cannedComments.find((c) => c === choice)) {
      dispatch(
        addComment({
          id: itemId,
          type,
          userId,
          userName,
          imageURL,
          text: choice,
        })
      );
      dispatch(hideModal());
    }
  };

  return (
    <div className={styles.container}>
      <div>{item}</div>
      {item && (
        <hr
          style={{ border: "0.5px solid var(--coral", margin: "1rem 0 0 0" }}
        />
      )}

      <p className={styles.heading}>Leave a comment</p>

      <div className={styles.comment_area}>
        {!!imageURL && (
          <img className={styles.image} src={imageURL} alt={userName} />
        )}
        {!imageURL && <div className={styles.image_replacement}></div>}
        <div className={styles.details}>
          <StackedButtons items={options} />
        </div>
      </div>
      <p className={styles.confirm}>
        {!!choice && (
          <IconTextButton
            icon={<MdChevronRight />}
            label={"COMMENT"}
            position={iconPosition.right}
            kind={buttonKind.primary}
            action={handleConfirmBtnClick}
          />
        )}
      </p>
    </div>
  );
};
