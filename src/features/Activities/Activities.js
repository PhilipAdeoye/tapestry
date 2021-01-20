import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppBar } from '../../app/AppBars/AppBar';
import { HelpButton } from '../../app/Buttons/HelpButton';
import { MainContainer } from '../../app/Containers/MainContainer';
import { SlideUpCSS } from '../../app/CSSTransitions/SlideUpCSS';
import { Body } from '../../app/Containers/Body';
import { ProfilePictureButton } from '../../app/Buttons/ProfilePictureButton';
import { BottomNav } from '../../app/AppBars/BottomNav';
import { TabButtons } from '../../app/Buttons/TabButtons';
import {
  activityViews,
  viewGoingActivities,
  viewPastActivities,
  viewUpcomingActivities,
} from './activitiesSlice';
import { Empty } from '../../app/Misc/Empty';
import { Squinty } from '../../app/Misc/Squinty';
import { format, isToday, isTomorrow, isYesterday } from 'date-fns';
import { MinorHeading } from '../../app/Headings/MinorHeading';
import { EventItem } from './EventItem';
import { getRelativeDateIfClose, scrollToTop } from '../../utils';

export const Activities = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  //   The most recently selected view
  const activeView = useSelector((state) => state.activities.selectedView);

  //   Events that aren't over yet that the user said yes to. Sort ascending
  const going = useSelector((state) =>
    state.activities.items
      .filter(
        (item) =>
          item.willAttend === true && Date.now() < Date.parse(item.endsAt)
      )
      .sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt))
  );

  //   All Events that aren't over yet. Sort ascending
  const upcoming = useSelector((state) =>
    state.activities.items
      .filter((item) => Date.now() < Date.parse(item.endsAt))
      .sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt))
  );
  //   Events the user said yes to, but have ended. Sort descending
  const past = useSelector((state) =>
    state.activities.items
      .filter(
        (item) =>
          item.willAttend === true && Date.now() > Date.parse(item.endsAt)
      )
      .sort((a, b) => Date.parse(b.startsAt) - Date.parse(a.startsAt))
  );

  const groupByStartDate = (acc, item) => {
    let date = '';
    if (
      isYesterday(Date.parse(item.startsAt)) ||
      isToday(Date.parse(item.startsAt)) ||
      isTomorrow(Date.parse(item.startsAt))
    ) {
      date = getRelativeDateIfClose(Date.parse(item.startsAt));
    } else {
      date = format(Date.parse(item.startsAt), 'EEEE, MMM d');
    }
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  };

  const goingGroupedByDate = going.reduce(groupByStartDate, {});
  const upcomingGroupedByDate = upcoming.reduce(groupByStartDate, {});
  const pastGroupedByDate = past.reduce(groupByStartDate, {});

  return (
    <>
      <AppBar
        left={
          <ProfilePictureButton
            image={useSelector((state) => state.meta.profilePic)}
            action={() => {
              history.push('/');
            }}
          />
        }
        right={<HelpButton />}
      />
      <MainContainer>
        <SlideUpCSS>
          <>
            {/* Although visually nested in the body, since this uses fixed positioning, it can be placed anywhere.
          For sanity sake, we place it outside the Body since it they both have a .container class on them */}
            <TabButtons
              items={[
                {
                  label: activityViews.upcoming,
                  isActive: activeView === activityViews.upcoming,
                  action: () => {
                    if (activeView !== activityViews.upcoming) {
                      dispatch(viewUpcomingActivities());
                      scrollToTop();
                    }
                  },
                },
                {
                  label: `${activityViews.going} ${
                    going.length ? '(' + going.length + ')' : ''
                  } `,
                  isActive: activeView === activityViews.going,
                  action: () => {
                    if (activeView !== activityViews.going) {
                      dispatch(viewGoingActivities());
                      scrollToTop();
                    }
                  },
                },
                {
                  label: activityViews.past,
                  isActive: activeView === activityViews.past,
                  action: () => {
                    if (activeView !== activityViews.past) {
                      dispatch(viewPastActivities());
                      scrollToTop();
                    }
                  },
                },
              ]}
            />
            <Body>
              <div
                style={{
                  marginTop: '3.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: '1',
                }}
              >
                {/* Render any upcoming if its selected */}
                {activeView === activityViews.upcoming &&
                  (upcoming.length > 0 ? (
                    <>
                      {Object.keys(upcomingGroupedByDate).map((key) => (
                        <Fragment key={key}>
                          <div style={{ paddingTop: '2rem' }}>
                            <MinorHeading text={key} boldText={true} />
                          </div>
                          {upcomingGroupedByDate[key].map((item, index) => (
                            <EventItem key={index} event={item} />
                          ))}
                        </Fragment>
                      ))}
                      <div style={{ paddingBottom: '8rem' }}></div>
                    </>
                  ) : (
                    <Empty
                      info="Any upcoming items will show up here"
                      illustration={
                        <Squinty message="No upcoming activities right now" />
                      }
                    />
                  ))}

                {/* Render any Going if its selected */}
                {activeView === activityViews.going &&
                  (going.length > 0 ? (
                    <>
                      {Object.keys(goingGroupedByDate).map((key) => (
                        <Fragment key={key}>
                          <div style={{ paddingTop: '2rem' }}>
                            <MinorHeading text={key} boldText={true} />
                          </div>
                          {goingGroupedByDate[key].map((item, index) => (
                            <EventItem key={index} event={item} />
                          ))}
                        </Fragment>
                      ))}
                      <div style={{ paddingBottom: '8rem' }}></div>
                    </>
                  ) : (
                    <Empty
                      info='Activities you say "Yes" to attending show up here'
                      illustration={
                        <Squinty message="No activities you are going to" />
                      }
                    />
                  ))}

                {/* Render any Past if its selected */}
                {activeView === activityViews.past &&
                  (past.length > 0 ? (
                    <>
                      {Object.keys(pastGroupedByDate).map((key) => (
                        <Fragment key={key}>
                          <div style={{ paddingTop: '2rem' }}>
                            <MinorHeading text={key} boldText={true} />
                          </div>
                          {pastGroupedByDate[key].map((item, index) => (
                            <EventItem key={index} event={item} />
                          ))}
                        </Fragment>
                      ))}
                      <div style={{ paddingBottom: '8rem' }}></div>
                    </>
                  ) : (
                    <Empty
                      info="After you attend an activity, it will show up here"
                      illustration={
                        <Squinty message="No past activities to show" />
                      }
                    />
                  ))}
              </div>
            </Body>
          </>
        </SlideUpCSS>
      </MainContainer>
      <BottomNav selected="activities" />
    </>
  );
};
