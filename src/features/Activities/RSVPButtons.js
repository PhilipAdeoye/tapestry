import React from 'react';
import styles from './RSVPButtons.module.css';
import classnames from 'classnames';
import car_keys from '../../images/car_keys.png';
import video from '../../images/video.png';
import taxi from '../../images/taxi.png';
import { JoinMethod } from './JoinMethod';
import {
  joinEventBy,
  joinOptions,
  willAttendEvent,
  willMaybeAttendEvent,
  willNotAttendEvent,
} from './activitiesSlice';
import { useDispatch } from 'react-redux';
import { removeRSVPFeedItem, addRSVPFeedItem } from '../Home/feedSlice';

export const RSVPButtons = ({ event }) => {
  const showJoinOptions = event.willAttend;

  const dispatch = useDispatch();

  return (
    <div className={styles.wrapper}>
      <div className={styles.buttons_area}>
        <button
          type="button"
          className={classnames(styles.button, {
            [styles.selected]: event.willAttend,
            [styles.flat_bottom]: showJoinOptions,
          })}
          onClick={() => {
            if (!event.willAttend) {
              dispatch(willAttendEvent(event.id));
              dispatch(addRSVPFeedItem({ eventId: event.id }));
            }
          }}
        >
          Yes
        </button>
        <button
          type="button"
          className={classnames(styles.button, {
            [styles.selected]: event.willAttend === false,
            [styles.flat_bottom]: showJoinOptions,
          })}
          onClick={() => {
            if (event.willAttend !== false) {
              dispatch(willNotAttendEvent(event.id));
              dispatch(removeRSVPFeedItem({ eventId: event.id }));
            }
          }}
        >
          No
        </button>
        <button
          type="button"
          className={classnames(styles.button, {
            [styles.selected]: event.willAttend === null,
            [styles.flat_bottom]: showJoinOptions,
          })}
          onClick={() => {
            if (event.willAttend !== null) {
              dispatch(willMaybeAttendEvent(event.id));
              dispatch(removeRSVPFeedItem({ eventId: event.id }));
            }
          }}
        >
          Maybe
        </button>
      </div>

      {/* Choose how to join the event */}
      {showJoinOptions && (
        <div className={styles.join_options_area}>
          {event.isJoinableViaVideo && (
            <JoinMethod
              image={video}
              altText="Video Play Button"
              text="Watch from home"
              isSelected={event.isJoiningBy === joinOptions.zoom}
              action={() => {
                if (event.isJoiningBy !== joinOptions.zoom) {
                  dispatch(
                    joinEventBy({ id: event.id, method: joinOptions.zoom })
                  );
                }
              }}
            />
          )}
          {event.isJoinableInPerson && (
            <>
              <JoinMethod
                image={taxi}
                altText="Taxi"
                text="I need a ride"
                isSelected={event.isJoiningBy === joinOptions.taxi}
                action={() => {
                  if (event.isJoiningBy !== joinOptions.taxi) {
                    dispatch(
                      joinEventBy({ id: event.id, method: joinOptions.taxi })
                    );
                  }
                }}
              />
              <JoinMethod
                image={car_keys}
                altText="Car keys"
                text="I have a ride"
                isSelected={event.isJoiningBy === joinOptions.car}
                action={() => {
                  if (event.isJoiningBy !== joinOptions.car) {
                    dispatch(
                      joinEventBy({ id: event.id, method: joinOptions.car })
                    );
                  }
                }}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};
