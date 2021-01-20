import React, { useState } from 'react';
import { IconContext } from 'react-icons/lib';
import { MdCheck, MdRemove } from 'react-icons/md';
import styles from './Item.module.css';
import iconButtonStyles from '../../app/Buttons/IconButton.module.css';
import { getInclusiveRandomInteger } from '../../utils';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { disapproveBallot } from '../Food/foodSlice';
import { approveBallot } from '../Food/foodSlice';

export const Item = ({ itemId, name, image, qty, approved }) => {
  // Use visual themes for items without an image
  const useThemes = !Boolean(image);
  const themes = [styles.plaster, styles.sunburst, styles.deep_blue];
  const [theme] = useState(
    themes[getInclusiveRandomInteger(0, themes.length - 1)]
  );

  const canDisapproveItem = useSelector(
    (state) =>
      state.food.ballotBox.items.filter((item) => item.approved).length > 1
  );

  return (
    <div className={styles.wrapper}>
      {/* If the item doesn't have an image, use a styled text description instead */}
      {useThemes ? (
        <div
          className={classnames(styles.image_substitute, {
            [theme]: useThemes,
            [styles.disapprove]: !approved,
          })}
        ></div>
      ) : (
        <img
          src={image}
          alt={name}
          className={classnames(styles.image, {
            [styles.disapprove]: !approved,
          })}
        />
      )}

      {/* Section to manage the cart item */}
      <div className={styles.details}>
        <p
          className={classnames(styles.name, {
            [styles.disapprove]: !approved,
          })}
        >
          {name}
        </p>
        <div className={styles.controls}>
          {approved ? (
            canDisapproveItem && <DisapproveButton id={itemId} name={name} />
          ) : (
            <ApproveButton id={itemId} name={name} />
          )}
        </div>
      </div>
    </div>
  );
};

const DisapproveButton = ({ id, name }) => {
  const dispatch = useDispatch();
  return (
    <button
      className={styles.vote_button}
      title={`I don't want ${name}`}
      onClick={() => {
        dispatch(disapproveBallot({ id }));
      }}
    >
      <IconContext.Provider
        value={{ className: iconButtonStyles.icon_btn__icon }}
      >
        <MdCheck />
      </IconContext.Provider>
    </button>
  );
};

const ApproveButton = ({ id, name }) => {
  const dispatch = useDispatch();
  return (
    <button
      className={classnames(styles.vote_button, styles.disapprove)}
      title={`I want ${name}`}
      onClick={() => {
        dispatch(approveBallot({ id }));
      }}
    >
      <IconContext.Provider
        value={{ className: iconButtonStyles.icon_btn__icon }}
      >
        <MdRemove />
      </IconContext.Provider>
    </button>
  );
};
