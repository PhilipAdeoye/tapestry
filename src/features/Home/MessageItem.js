import React from 'react';
import { MdThumbUp } from 'react-icons/md';
import { RiThumbUpLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { CardActionButtonGroup } from '../../app/Buttons/CardActionButtonGroup';
import { Card, CardImage } from '../../app/Containers/Card/Card';
import { Badge, badgeThemes } from '../../app/Misc/Badge';
import feedItemStyles from './FeedItem.module.css';
import { toggleLike } from './feedSlice';
import classnames from 'classnames';
import { getParagraphsFromTextBody } from '../../utils';

export const MessageItem = ({
  id,
  type,
  text,
  userId,
  userName,
  imageURL,
  likedAt,
  notificationCount,
  showNotificationBadge,
}) => {
  const dispatch = useDispatch();

  const isLiked = !!likedAt;

  return (
    <Card>
      <div className={feedItemStyles.content}>
        <div className={feedItemStyles.left_side}>
          <CardImage src={imageURL} alt={userName} />
        </div>

        <div className={feedItemStyles.right_side}>
          <p className={classnames(feedItemStyles.text, 'rubik', 'medium')}>
            {userName}
          </p>
          {getParagraphsFromTextBody(text).map((line, index) => (
            <p
              key={index}
              className={classnames(feedItemStyles.text, 'nunito')}
            >
              {line}{' '}
            </p>
          ))}
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
      <CardActionButtonGroup
        items={[
          {
            text: isLiked ? 'You like this' : 'Like',
            isHighlighted: isLiked,
            useCoralIcon: isLiked,
            icon: isLiked ? <MdThumbUp /> : <RiThumbUpLine />,
            action: () => {
              dispatch(toggleLike({ id, type }));
            },
          },
        ]}
      />
    </Card>
  );
};
