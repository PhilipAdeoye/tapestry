import React from "react";
import { SectionDivider } from "../../app/Misc/SectionDivider";
import {
  buttonKind,
  iconPosition,
  IconTextButton,
} from "../../app/Buttons/IconTextButton";
import styles from "./Confirm.module.css";
import { MdChevronRight } from "react-icons/md";

export const Confirm = ({
  title,
  bodyContent,
  action,
  bodyIsHTML = false,
  confirmButtonText = "OK",
}) => {
  const onButtonClicked = () => {
    if (action && typeof action === "function") {
      action();
    }
  };

  return (
    <div className={styles.container}>
      {/* title */}
      {title && (
        <>
          <p className={styles.greeting}>{title}</p>
          <SectionDivider />
        </>
      )}

      {/* Body */}
      <div className={styles.lead}>
        {bodyIsHTML && bodyContent}
        {!bodyIsHTML && <p>{bodyContent}</p>}
      </div>

      {/* Action Button */}
      {action && typeof action === "function" && (
        <div className={styles.button_section}>
          <IconTextButton
            icon={<MdChevronRight />}
            label={confirmButtonText}
            position={iconPosition.right}
            kind={buttonKind.primary}
            action={onButtonClicked}
          />
        </div>
      )}
    </div>
  );
};
