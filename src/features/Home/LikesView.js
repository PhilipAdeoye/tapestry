import React from 'react';
import styles from './LikesView.module.css';

/**
 *
 * @param {JSX.Element} likedItem
 * @param {Array} people
 * @param {string} people[].image - A url for the person's image
 * @param {string} people[].name - The person's name
 */
export const LikesView = ({ likedItem = null, people }) => {
  return (
    <div className={styles.container}>
      <div>{likedItem}</div>
      {likedItem && (
        <hr
          style={{ border: '0.5px solid var(--coral', margin: '1rem 0 0 0' }}
        />
      )}

      {people.length > 0 && (
        <>
          <p className={styles.heading}>Liked by</p>
          {people.map((person, index) => (
            <div key={index} className={styles.person}>
              {!!person.image && (
                <img
                  className={styles.image}
                  src={person.image}
                  alt={person.name}
                />
              )}
              {!person.image && (
                <div className={styles.image_replacement}></div>
              )}

              <p className={styles.name}>{person.name}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
