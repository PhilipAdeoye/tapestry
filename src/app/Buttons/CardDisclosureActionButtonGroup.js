import React from 'react';
import { IconContext } from 'react-icons/lib';
import { MdArrowForward } from 'react-icons/md';
import { createInclusiveRange } from '../../utils';
import styles from './CardDisclosureActionButtonGroup.module.css';
import classnames from 'classnames';

/**
 *
 * @param {Array} items
 * @param {string} items[].text - The button text
 * @param {IconType} items[].icon - An optional react icon e.g MdThumbUp, MdComment, etc
 * @param {function} items[].action - A optional callback function for when a button is clicked
 * @param {string} items[].extraContent - Optional extra content that can render in a span tag, e.g, text, badges, etc
 * @param {boolean} items[].hideDisclosureIcon - Optionally hide the disclosure icon
 * @param {boolean} items[].isDisabled - Optionally disable the button
 * @param {boolean} items[].isHighlighted - Optionally highlight the button
 */
export const CardDisclosureActionButtonGroup = ({ items }) => {
  const keys = createInclusiveRange(1, items.length);
  return (
    <>
      {items.length && (
        <div className={styles.wrapper}>
          {items.map((item, index) => (
            // Button
            <button
              key={keys[index]}
              type="button"
              className={classnames(styles.button, {
                [styles.highlight]: item.isHighlighted,
              })}
              disabled={item.isDisabled}
              onClick={() => {
                if (item.action && typeof item.action === 'function') {
                  item.action();
                }
              }}
            >
              {/* Icon */}
              {item.icon && (
                <IconContext.Provider value={{ className: styles.icon }}>
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
