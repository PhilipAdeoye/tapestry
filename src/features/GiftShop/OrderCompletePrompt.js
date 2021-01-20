import React from 'react';
import styles from './OrderCompletePrompt.module.css';
import team_cheer from '../../images/team_cheer.svg';
import { useDispatch, useSelector } from 'react-redux';
import { hide } from '../Modal/modalSlice';
import {
  buttonKind,
  iconPosition,
  IconTextButton,
} from '../../app/Buttons/IconTextButton';
import { MdChevronRight } from 'react-icons/md';

export const OrderCompletePrompt = () => {
  const dispatch = useDispatch();
  const coachName = useSelector((state) => state.meta.hiliCoachName);

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <img
          className={styles.image}
          src={team_cheer}
          alt="A cheering emoji who's raising their hands. Woot woot!"
        />
      </div>
      <p className={styles.title}>Order Complete!</p>
      <p className={styles.message}>
        {coachName} will contact you about delivery options
      </p>
      <div className={styles.button_section}>
        <IconTextButton
          icon={<MdChevronRight />}
          label={'OK'}
          position={iconPosition.right}
          kind={buttonKind.primary}
          action={() => {
            dispatch(hide());
          }}
        />
      </div>
    </div>
  );
};
