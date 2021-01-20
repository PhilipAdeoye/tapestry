import React from 'react';
import { IconContext } from 'react-icons/lib';
import { createInclusiveRange } from '../../utils';
import styles from './CardActionButtonGroup.module.css';
import classnames from 'classnames';

/**
 *
 * @param {Array} items
 * @param {string} items[].text - The button text
 * @param {IconType} items[].icon - An optional react icon e.g MdThumbUp, MdComment, etc
 * @param {boolean} items[].isHighlighted - Whether or not to hightlight the button
 * @param {boolean} items[].useCoralIcon - Whether or not to use a coral-colored icon
 * @param {function} items[].action - A optional callback function for when a button is clicked
 */
export const CardActionButtonGroup = ({ items }) => {
  const keys = createInclusiveRange(1, items.length);
  return (
    <>
      {items.length && (
        <div className={styles.wrapper}>
          {items.map((item, index) => (
            <button
              key={keys[index]}
              type="button"
              className={classnames(styles.button, {
                [styles.highlighted]: item.isHighlighted,
              })}
              onClick={() => {
                if (item.action && typeof item.action === 'function') {
                  item.action();
                }
              }}
            >
              {item.icon && (
                <IconContext.Provider
                  value={{
                    className: classnames(styles.icon, {
                      [styles.coral_icon]: item.useCoralIcon,
                    }),
                  }}
                >
                  {item.icon}
                </IconContext.Provider>
              )}
              <span className={styles.text}>{item.text}</span>
            </button>
          ))}
        </div>
      )}
    </>
  );
};
