import { format, isToday, isTomorrow, isYesterday } from 'date-fns';
import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar } from '../../app/AppBars/AppBar';
import { BottomNav } from '../../app/AppBars/BottomNav';
import { HelpButton } from '../../app/Buttons/HelpButton';
import { ProfilePictureButton } from '../../app/Buttons/ProfilePictureButton';
import { Body } from '../../app/Containers/Body';
import { MainContainer } from '../../app/Containers/MainContainer';
import { SlideUpCSS } from '../../app/CSSTransitions/SlideUpCSS';
import { BigIconWithText } from '../../app/Headings/BigIconWithText';
import { Empty } from '../../app/Misc/Empty';
import { Squinty } from '../../app/Misc/Squinty';
import bell from '../../images/bell.svg';
import { updateLastVisit } from './feedSlice';
import { getRelativeDateIfClose } from '../../utils';
import { CohortRSVPItem } from './CohortRSVPItem';
import { feedItemType } from './feedSlice';
import { MessageItem } from './MessageItem';
import { RewardItem } from './RewardItem';
import { RSVPItem } from './RSVPItem';
import { useEffect } from 'react';

export const Home = () => {
  const dispatch = useDispatch();

  const lastVisitInMillis = Date.parse(
    useSelector((state) => state.feed.lastVisit)
  );
  const feedItems = [...useSelector((state) => state.feed.items)].sort(
    (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
  );

  const groupByStartDate = (acc, item) => {
    let date = '';
    if (
      isYesterday(Date.parse(item.createdAt)) ||
      isToday(Date.parse(item.createdAt)) ||
      isTomorrow(Date.parse(item.createdAt))
    ) {
      date = getRelativeDateIfClose(Date.parse(item.createdAt));
    } else {
      date = format(Date.parse(item.createdAt), 'EEEE, MMM d');
    }
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  };

  const newStuff = feedItems
    .filter((item) => Date.parse(item.createdAt) >= lastVisitInMillis)
    .map((item, index) => {
      return {
        ...item,
        showNotificationBadge: true,
        notificationCount: index + 1,
      };
    })
    .reduce(groupByStartDate, {});

  const oldStuff = feedItems
    .filter((item) => Date.parse(item.createdAt) < lastVisitInMillis)
    .reduce(groupByStartDate, {});

  useEffect(() => {
    // Do stuff here that will normally go into componentDidMount
    // componentDidMount is a void function, so the return at the end work differently in this case

    return () => {
      // Do stuff here that would normally go into componentWillUnmount
      dispatch(updateLastVisit());
    };
  }, [dispatch]);

  return (
    <>
      <AppBar
        left={
          <ProfilePictureButton
            image={useSelector((state) => state.meta.profilePic)}
          />
        }
        right={<HelpButton />}
      />
      <MainContainer>
        <SlideUpCSS>
          <Body>
            <BigIconWithText image={bell} imgAlt="A gold bell" text="Latest" />
            {feedItems.length ? (
              <>
                {Object.keys(newStuff).map((key) => (
                  <Fragment key={key}>
                    <p
                      className="rubik medium"
                      style={{ paddingBottom: '1rem' }}
                    >
                      {key}
                    </p>
                    {newStuff[key].map((item, index) => (
                      <FeedItem key={index} stuff={item}></FeedItem>
                    ))}
                  </Fragment>
                ))}
                {Object.keys(oldStuff).map((key) => (
                  <Fragment key={key}>
                    <p
                      className="rubik medium"
                      style={{
                        paddingBottom: '1rem',
                        paddingTop:
                          Object.keys(newStuff).length > 0 ? '1.5rem' : '0',
                      }}
                    >
                      {key}
                    </p>
                    {oldStuff[key].map((item, index) => (
                      <FeedItem key={index} stuff={item}></FeedItem>
                    ))}
                  </Fragment>
                ))}

                <FeedTerminator />
              </>
            ) : (
              <Empty illustration={<Squinty message="All caught up!" />} />
            )}
          </Body>
        </SlideUpCSS>
      </MainContainer>
      <BottomNav />
    </>
  );
};

const FeedTerminator = () => {
  return (
    <div
      style={{
        paddingTop: '4rem',
        paddingBottom: '7rem',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Squinty message="All caught up!" />
    </div>
  );
};

const FeedItem = ({ stuff }) => {
  let item = <></>;
  if (stuff.type === feedItemType.reward) {
    item = <RewardItem {...stuff} />;
  } else if (stuff.type === feedItemType.RSVP) {
    item = <RSVPItem {...stuff} />;
  } else if (stuff.type === feedItemType.cohortRSVP) {
    item = <CohortRSVPItem {...stuff} />;
  } else if (stuff.type === feedItemType.message) {
    item = <MessageItem {...stuff} />;
  }
  return <div style={{ paddingBottom: '1rem' }}>{item}</div>;
};
