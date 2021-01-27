import React from "react";
import styles from "./YourGoal.module.css";
import patternContainerStyles from "./Containers/PatternContainer.module.css";
import {
  buttonKind,
  iconPosition,
  IconTextButton,
} from "../../app/Buttons/IconTextButton";
import { MdChevronRight } from "react-icons/md";
import { dotTheme, ProgressDots } from "../../app/Misc/ProgressDots";

export const YourGoal = ({ image, name, progressDots, nextAction }) => {
  return (
    <div className={patternContainerStyles.content_container}>
      <p className={styles.title}>Goals</p>
      <img src={image} alt={name} className={styles.profile_pic} />
      <p className={styles.heading}>Healthy Blood Pressure</p>
      <p className={styles.info}>120 Systolic</p>
      <p className={styles.info}>80 Diastolic</p>
      <div className={styles.progress_dots_container}>
        <ProgressDots current={1} max={4} theme={dotTheme.deepBlue} />
      </div>
      <IconTextButton
        label="Learn How"
        position={iconPosition.right}
        kind={buttonKind.default}
        useLargeBtn={true}
        icon={<MdChevronRight />}
        action={() => nextAction()}
      />
    </div>
  );
};
