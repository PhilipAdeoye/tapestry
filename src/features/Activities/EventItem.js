import { format } from 'date-fns';
import React from 'react';
import { IconContext } from 'react-icons/lib';
import { MdAccessTime, MdSchedule, MdThumbUp } from 'react-icons/md';
import { GrLocation } from 'react-icons/gr';
import { Card, CardImage } from '../../app/Containers/Card/Card';
import { CardInfo } from '../../app/Containers/Card/CardInfo';
import { RewardPointsChip } from '../../app/Misc/RewardPointsChip';
import styles from './EventItem.module.css';
import { RSVPButtons } from './RSVPButtons';
import { CardActionButtonGroup } from '../../app/Buttons/CardActionButtonGroup';
import classnames from 'classnames';

export const EventItem = ({ event }) => {
  const isHappeningNow =
    Date.parse(event.startsAt) < Date.now() &&
    Date.parse(event.endsAt) > Date.now();

  const isPastEvent = Date.now() > Date.parse(event.endsAt);

  return (
    <div className={styles.wrapper}>
      <Card>
        {/* If the event is happening now, show an indicator */}
        {isHappeningNow && (
          <CardInfo
            shouldAnimate={true}
            text="Happening Right Now"
            icon={<MdSchedule />}
          />
        )}

        <div className={styles.content}>
          <div className={styles.left_side}>
            {/* Picture of event host */}
            <CardImage
              src={event.hostedByCoachImg}
              alt={event.hostedByCoachName}
            />
            <div className={styles.rewards_wrapper}>
              <RewardPointsChip points={event.pointsReward} />
            </div>
          </div>
          <div className={styles.right_side}>
            <p className={styles.title}>{event.title}</p>

            {/* When the event starts */}
            <div className={styles.detail}>
              <IconContext.Provider value={{ className: styles.icon }}>
                <MdAccessTime />
              </IconContext.Provider>
              <span className={styles.detail_text}>
                {format(Date.parse(event.startsAt), 'MMM d, h:mm a')}
              </span>
            </div>

            {/* Where the event is hosted at */}
            {event.address && (
              <div className={styles.detail}>
                <IconContext.Provider value={{ className: styles.icon }}>
                  <GrLocation />
                </IconContext.Provider>
                <span className={styles.detail_text}>{event.address}</span>
              </div>
            )}

            {/* If can no longer RSVP, but said yes they will attend, but the event isn't happening right now */}
            {!event.canRSVP && event.willAttend && !isPastEvent && (
              <div className={styles.detail}>
                <IconContext.Provider
                  value={{ className: classnames(styles.icon, styles.coral) }}
                >
                  <MdThumbUp />
                </IconContext.Provider>
                <span className={styles.detail_text}>
                  You are going to this
                </span>
              </div>
            )}
          </div>
        </div>
        {event.canRSVP && <RSVPButtons event={event} />}
        {isHappeningNow && event.isJoinableViaVideo && (
          <CardActionButtonGroup
            items={[
              {
                text: 'Join with Webex',
                action: () => {
                  if (event.joinUrl) {
                    window.open(event.joinUrl, '_blank');
                  }
                },
              },
            ]}
          />
        )}
      </Card>
    </div>
  );
};
