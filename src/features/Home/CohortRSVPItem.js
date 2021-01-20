import React from 'react';
import { Card, CardImage } from '../../app/Containers/Card/Card';
import { CardComments } from '../../app/Containers/Card/CardComments';
import feedItemStyles from './FeedItem.module.css';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { IconContext } from 'react-icons/lib';
import { MdAccessTime, MdModeComment, MdThumbUp } from 'react-icons/md';
import { format } from 'date-fns';
import { Badge, badgeThemes } from '../../app/Misc/Badge';
import { toggleCohortItemLike, cannedComments } from './feedSlice';
import { RiThumbUpLine } from 'react-icons/ri';
import { BiComment } from 'react-icons/bi';
import { CardActionButtonGroup } from '../../app/Buttons/CardActionButtonGroup';
import { show } from '../Modal/modalSlice';
import { LikesView } from './LikesView';
import { BriefRSVP } from './ItemBrief/BriefRSVP';
import { AddCommentPrompt } from './AddCommentPrompt';

export const CohortRSVPItem = ({
  id,
  type,
  imageURL,
  userName,
  eventId,
  likes,
  comments,
  notificationCount,
  showNotificationBadge,
}) => {
  const dispatch = useDispatch();

  const event = useSelector((state) =>
    state.activities.items.find((x) => x.eventId === eventId)
  );

  const currentUser = useSelector((state) => {
    return {
      userId: state.meta.userId,
      userName: state.meta.userName,
      pic: state.meta.profilePic,
    };
  });

  const isLikedByUser = !!likes.find((l) => l.userId === currentUser.userId);

  const toggleLike = () => {
    dispatch(
      toggleCohortItemLike({
        id,
        userId: currentUser.userId,
        userName: currentUser.userName,
        imageURL: currentUser.pic,
        type,
      })
    );
  };

  return (
    <Card>
      <div className={feedItemStyles.content}>
        <div className={feedItemStyles.left_side}>
          <CardImage src={imageURL} alt={userName} />
        </div>

        <div className={feedItemStyles.right_side}>
          <p className={classnames(feedItemStyles.text, 'nunito')}>
            {userName} is going to
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

          {/* Like Count */}
          {likes.length > 0 && (
            <button
              type="button"
              className={feedItemStyles.detail_button}
              onClick={() =>
                dispatch(
                  show({
                    content: (
                      <LikesView
                        likedItem={
                          <BriefRSVP
                            image={imageURL}
                            name={userName}
                            title={event.title}
                          />
                        }
                        people={likes.map((l) => {
                          return {
                            name:
                              l.userName === currentUser.userName
                                ? 'You'
                                : l.userName,
                            image: l.imageURL,
                          };
                        })}
                      />
                    ),
                  })
                )
              }
            >
              <IconContext.Provider
                value={{
                  className: classnames(
                    feedItemStyles.icon,
                    feedItemStyles.coral
                  ),
                }}
              >
                <MdThumbUp />
              </IconContext.Provider>
              <span className={feedItemStyles.detail_text}>
                {`${likes.length} ${
                  likes.length === 1 ? 'person likes' : 'people like'
                } this`}
              </span>
            </button>
          )}

          {/* Comment Count */}
          {comments.length > 0 && (
            <div
              className={feedItemStyles.detail}
              style={{ paddingTop: '0.1rem' }}
            >
              <IconContext.Provider
                value={{
                  className: classnames(
                    feedItemStyles.icon,
                    feedItemStyles.coral
                  ),
                }}
              >
                <MdModeComment />
              </IconContext.Provider>
              <span className={feedItemStyles.detail_text}>
                {`${comments.length} ${
                  comments.length === 1 ? 'comment' : 'comments'
                }`}
              </span>
            </div>
          )}
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

      {comments.length > 0 && (
        <CardComments
          items={[...comments]
            .sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt))
            .map((c) => {
              return { name: c.userName, image: c.imageURL, text: c.text };
            })}
        />
      )}
      <CardActionButtonGroup
        items={[
          {
            text: isLikedByUser ? 'You like this' : 'Like',
            isHighlighted: isLikedByUser,
            useCoralIcon: isLikedByUser,
            icon: isLikedByUser ? <MdThumbUp /> : <RiThumbUpLine />,
            action: toggleLike,
          },
          {
            text: 'Comment',
            icon: <BiComment />,
            action: () => {
              dispatch(
                show({
                  content: (
                    <AddCommentPrompt
                      type={type}
                      userId={currentUser.userId}
                      userName={currentUser.userName}
                      imageURL={currentUser.pic}
                      item={
                        <BriefRSVP
                          image={imageURL}
                          name={userName}
                          title={event.title}
                        />
                      }
                      itemId={id}
                      cannedComments={[...cannedComments]}
                    />
                  ),
                })
              );
            },
          },
        ]}
      />
    </Card>
  );
};
