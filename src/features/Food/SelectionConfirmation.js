import { format } from 'date-fns';
import React from 'react';
import { useSelector } from 'react-redux';
import { SectionDivider } from '../../app/Misc/SectionDivider';
import styles from './SelectionConfirmation.module.css';

export const SelectionConfirmation = () => {
  const orderTime = useSelector((state) => state.food.orderTime);
  const orderDate = format(
    Date.parse(useSelector((state) => state.food.orderWillBePlacedOn)),
    'EEEE, MMMM d'
  );
  const deliveryDate = format(
    Date.parse(useSelector((state) => state.food.itemsWillBeDeliveredOn)),
    'EEEE, MMMM d'
  );

  return (
    <div className={styles.info_container}>
      <p className={styles.title}>Great! We'll take it from here!</p>
      <SectionDivider />
      <p className={styles.description}>
        You can change your picks until{' '}
        <strong>
          <em>{orderTime}</em>
        </strong>{' '}
        on {orderDate}.
      </p>
      <p className={styles.description}>We will deliver on {deliveryDate}</p>
    </div>
  );
};
