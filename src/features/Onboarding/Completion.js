import React from 'react';
import { MdChevronRight } from 'react-icons/md';
import {
  buttonKind,
  iconPosition,
  IconTextButton,
} from '../../app/Buttons/IconTextButton';
import storefront from '../../images/storefront.svg';

import styles from './Completion.module.css';
import plainContainerStyles from './Containers/PlainContainer.module.css';
import { Sunburst } from '../../app/Misc/Sunburst';

export const Completion = ({ points, nextAction }) => {
  return (
    <div className={plainContainerStyles.content_container}>
      <p className={styles.title}>You Earned Points</p>
      <div className={styles.sunburst_wrapper}>
        <Sunburst>
          <span className={styles.sunburst_points}>+{points}</span>
        </Sunburst>
      </div>
      <div className={styles.info_grid}>
        <div className={styles.rewards_info}>
          <div className={styles.reward_points}>
            <p>+{points}</p>
          </div>
          <p className={styles.info}>Signing Bonus!</p>
        </div>
        <div className={styles.giftshop_info}>
          <div className={styles.storefront_wrapper}>
            <img
              className={styles.storefront}
              src={storefront}
              alt="Storefront"
            />
          </div>
          <p className={styles.info}>
            You can spend your points on goodies in the gift shop later
          </p>
        </div>
      </div>

      <IconTextButton
        label="Let's do this"
        position={iconPosition.right}
        kind={buttonKind.primary}
        useLargeBtn={true}
        icon={<MdChevronRight />}
        action={() => nextAction()}
      />
    </div>
  );
};
