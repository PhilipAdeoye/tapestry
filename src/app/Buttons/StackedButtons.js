import React from 'react';
import styles from './StackedButtons.module.css';
import classnames from 'classnames';
import { createInclusiveRange } from '../../utils';

/**
 * @param {Array} items
 * @param {string} items[].text - The button text
 * @param {boolean} items[].isSelected - If the item is selected
 * @param {function} items[].action - A optional callback function for when a button is clicked
 */
export const StackedButtons = ({ items }) => {
  const keys = createInclusiveRange(1, items.length);

  return (
    <>
      {/* Only render the button group if there are any items to render */}
      {items.length && (
        // Render the wrapping div
        <div className={styles.wrapper}>
          {items.map((item, index) => (
            // Create a button element for each item
            <button
              key={keys[index]}
              type="button"
              className={classnames(styles.button, {
                [styles.selected]: item.isSelected,
              })}
              //   set an onClick handler that only fires if an actual function is supplied
              onClick={() => {
                if (item.action && typeof item.action === 'function') {
                  item.action();
                }
              }}
            >
              {/* Content contains the text and any extra elements that follow the text: Badges and such */}
              <div className={styles.content}>
                <span className={styles.text}>{item.text}</span>

                {/* Put any extra content here. Shamelessly copy code from the DisclosureButtonGroup, it's very similar. 
                Q: Why don't I just make the DisclosureButtonGroup more flexible? 
                A: This stuff is hard enough as is. Let's keep it simple, shall we?
                */}
              </div>
            </button>
          ))}
        </div>
      )}
    </>
  );
};
