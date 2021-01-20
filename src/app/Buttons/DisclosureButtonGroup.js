import React from 'react';
import { IconContext } from 'react-icons/lib';
import { MdArrowForward } from 'react-icons/md';
import { createInclusiveRange } from '../../utils';
import classnames from 'classnames';
import styles from './DisclosureButtonGroup.module.css';

/**
 *
 * @param {Array} items
 * @param {string} items[].text - The button text
 * @param {IconType} items[].icon - A react icon e.g MdThumbUp, MdComment, etc
 * @param {boolean} items[].useCoralIcon - Whether or not to use a coral-colored main icon
 * @param {function} items[].action - A optional callback function for when a button is clicked
 * @param {string} items[].extraContent - Optional extra content that can render in a span tag, e.g, text, badges, etc
 * @param {boolean} items[].hideDisclosureIcon - Optionally hide the disclosure icon
 */
export const DisclosureButtonGroup = ({ items }) => {
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
              {/* If this item has an associated icon */}
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

              {/* Content contains the text and any extra elements that follow the text: Badges and such */}
              <div className={styles.content}>
                <span className={styles.text}>{item.text}</span>

                {/* Render any extra content */}
                {item.extraContent && (
                  <span className={styles.extra_content}>
                    {item.extraContent}
                  </span>
                )}
              </div>

              {/* Render the disclosure icon */}
              {!Boolean(item.hideDisclosureIcon) && (
                <IconContext.Provider value={{ className: styles.icon }}>
                  <div>
                    <MdArrowForward />
                  </div>
                </IconContext.Provider>
              )}
            </button>
          ))}
        </div>
      )}
    </>
  );
};
