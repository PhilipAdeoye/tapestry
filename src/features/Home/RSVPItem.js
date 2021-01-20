import { format } from 'date-fns';
import React from 'react';
import { IconContext } from 'react-icons/lib';
import { MdAccessTime, MdInsertInvitation } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CardDisclosureActionButtonGroup } from '../../app/Buttons/CardDisclosureActionButtonGroup';
import { Card, CardImage } from '../../app/Containers/Card/Card';
import { Badge, badgeThemes } from '../../app/Misc/Badge';
import { viewGoingActivities } from '../Activities/activitiesSlice';
import feedItemStyles from './FeedItem.module.css';
import classnames from 'classnames';

export const RSVPItem = ({
  id,
  createdAt,
  eventId,
  notificationCount,
  showNotificationBadge,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const event = useSelector((state) =>
    state.activities.items.find((x) => x.eventId === eventId)
  );

  return (
    <Card>
      <div className={feedItemStyles.content}>
        <div className={feedItemStyles.left_side}>
          <CardImage
            src={event.hostedByCoachImg}
            alt={event.hostedByCoachName}
          />
        </div>

        <div className={feedItemStyles.right_side}>
          <p className={classnames(feedItemStyles.text, 'nunito')}>
            You are going to
          </p>
          <p className={classnames(feedItemStyles.text, 'rubik', 'medium')}>
            {event.title}
          </p>

          {/* When the event starts */}
          <div className={feedItemStyles.detail}>
            <IconContext.Provider value={{ className: feedItemStyles.icon }}>
              <MdAccessTime />
            </IconContext.Provider>
            <span className={feedItemStyles.detail_text}>
              {format(Date.parse(event.startsAt), 'MMM d, h:mm a')}
            </span>
          </div>
        </div>

        {/* Always should be the right-most item inside a feedItemStyles.content so that it shows right */}
        {showNotificationBadge && (
          <div className={feedItemStyles.badge_wrapper}>
            <div className={feedItemStyles.badge_inner_wrapper}>
              <Badge
                text={notificationCount}
                theme={badgeThemes.fusionYellow}
              />
            </div>
          </div>
        )}
      </div>
      <CardDisclosureActionButtonGroup
        items={[
          {
            text: 'See Activity',
            icon: <MdInsertInvitation />,
            action: () => {
              dispatch(viewGoingActivities());
              history.push('/activities');
            },
          },
        ]}
      />
    </Card>
  );
};
