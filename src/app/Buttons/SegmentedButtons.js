import React from 'react';
import { createInclusiveRange } from '../../utils';
import styles from './SegmentedButtons.module.css';

/**
 *
 * @param {Array} items
 * @param {string} items[].text - The button text
 * @param {function} items[].action - A optional callback function for when a button is clicked
 * @param {string} items[].extraContent - Optional extra content that can render in a span tag, e.g, text, badges, etc
 */
export const SegmentedButtons = ({ items }) => {
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
              className={styles.button}
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

                {/* Render any extra content */}
                {item.extra_content && (
                  <span className={styles.extra_content}>
                    {item.extraContent}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </>
  );
};
