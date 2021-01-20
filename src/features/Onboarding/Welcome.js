import React from 'react';
import styles from './Welcome.module.css';
import patternContainerStyles from './Containers/PatternContainer.module.css';
import { MdChevronRight } from 'react-icons/md';
import {
  iconPosition,
  IconTextButton,
  buttonKind,
} from '../../app/Buttons/IconTextButton';

export const Welcome = ({ name, image, nextAction }) => {
  return (
    <div className={patternContainerStyles.content_container}>
      <p className={styles.title}>Hi {name}!</p>
      <img
        src={image}
        alt={`Headshot of ${name}`}
        className={styles.big_picture}
      />
      <IconTextButton
        label="Get Started"
        position={iconPosition.right}
        kind={buttonKind.default}
        useLargeBtn={true}
        icon={<MdChevronRight />}
        action={() => nextAction()}
      />
    </div>
  );
};
