import React, { useState } from 'react';
import { MdCardGiftcard, MdThumbUp } from 'react-icons/md';
import { Card, CardImageIllustration } from '../../app/Containers/Card/Card';
import styles from './RewardItem.module.css';
import feedItemStyles from './FeedItem.module.css';
import { CardActionButtonGroup } from '../../app/Buttons/CardActionButtonGroup';
import { RiThumbUpLine } from 'react-icons/ri';
import { getInclusiveRandomInteger } from '../../utils';
import { Sunburst } from '../../app/Misc/Sunburst';
import { useDispatch } from 'react-redux';
import { toggleLike } from './feedSlice';
import { Badge, badgeThemes } from '../../app/Misc/Badge';

export const RewardItem = ({
  id,
  type,
  createdAt,
  rewardInPoints,
  rewardMessage,
  likedAt,
  notificationCount,
  showNotificationBadge,
}) => {
  const dispatch = useDispatch();

  const isLiked = !!likedAt;

  const titles = ['Awesome!', 'Great job!', 'Fine work!', 'Kudos!'];
  const [title] = useState(
    titles[getInclusiveRandomInteger(0, titles.length - 1)]
  );

  return (
    <Card>
      <div className={feedItemStyles.content}>
        <div className={styles.illustration_wrapper}>
          <div className={styles.illustration_inner_wrapper}>
            <CardImageIllustration icon={<MdCardGiftcard />} />
          </div>
        </div>

        <div className={styles.body}>
          <div className={styles.sunburst_wrapper}>
            <Sunburst>
              <span className={styles.sunburst_points}>+{rewardInPoints}</span>
            </Sunburst>
          </div>
          <p className={styles.title}>{title}</p>
          <p className={styles.text}>{rewardMessage}</p>
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
