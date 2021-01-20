import React from 'react';
import styles from './CardComments.module.css';
import { CardSectionDivider } from './Card';

/**
 * @param {Array} items
 * @param {string} items[].text - The text of the comment
 * @param {string} items[].name - The commenter's name
 * @param {string} items[].image - A url for the commenter's image
 */
export const CardComments = ({ items }) => {
  return (
    <>
      <CardSectionDivider />
      <div className={styles.container}>
        {items.map((item, index) => (
          <div key={index} className={styles.wrapper}>
            {/* left side */}
            <div className={styles.left_side}>
              {!!item.image && (
                <img
                  className={styles.image}
                  src={item.image}
                  alt={item.name}
                />
              )}
              {!item.image && (
                <div className={styles.image_replacement}>
                  <span>{item.name.charAt(0).toUpperCase()}</span>{' '}
                </div>
              )}
            </div>

            {/* right side */}
            <div className={styles.right_side}>
              <p className={styles.title}>{item.name}</p>
              <p className={styles.text}>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
