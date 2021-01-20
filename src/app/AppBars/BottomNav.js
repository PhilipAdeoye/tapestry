import React from 'react';
import classnames from 'classnames';

import styles from './BottomNav.module.css';
import bn_activities_active from '../../images/bn_activities_active.svg';
import bn_activities from '../../images/bn_activities.svg';
import bn_cutlery from '../../images/bn_cutlery.svg';
import bn_cutlery_active from '../../images/bn_cutlery_active.svg';
import bn_folks from '../../images/bn_folks.svg';
import bn_folks_active from '../../images/bn_folks_active.svg';
import bn_latest from '../../images/bn_latest.svg';
import bn_latest_active from '../../images/bn_latest_active.svg';
import bn_rewards from '../../images/bn_rewards.svg';
import bn_rewards_active from '../../images/bn_rewards_active.svg';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Badge, badgeThemes } from '../Misc/Badge';
import { feedItemType } from '../../features/Home/feedSlice';

export const BottomNav = ({ selected = 'home' }) => {
  const history = useHistory();

  const foodOrderExists = !!useSelector((state) => state.food.order);
  const shouldViewFoodOnboarding = !useSelector(
    (state) => state.meta.hasViewedFoodOnboarding
  );
  const shouldViewRewardsOnboarding = !useSelector(
    (state) => state.meta.hasViewedRewardsOnboarding
  );

  // Needed to show notification badges on Home
  const lastVisitedFeed = Date.parse(
    useSelector((state) => state.feed.lastVisit)
  );
  const latestNotificationCount = useSelector(
    (state) =>
      state.feed.items.filter((x) => Date.parse(x.createdAt) > lastVisitedFeed)
        .length
  );

  // Needed to show notification badges on Home
  const lastVisitedRewardsHub = Date.parse(
    useSelector((state) => state.feed.lastVisitedRewardsHub)
  );
  const rewardsNotificationCount = useSelector(
    (state) =>
      state.feed.items.filter(
        (x) =>
          Date.parse(x.createdAt) > lastVisitedRewardsHub &&
          x.type === feedItemType.reward
      ).length
  );

  return (
    <footer className={styles.footer}>
      <nav className={classnames(styles.footer__content, 'container')}>
        {/* If removing or adding to the number of buttons here, update the flex-basis = 100/number for .button */}
        <BottomNavButton
          label="Home"
          isActive={selected === 'home'}
          notificationCount={latestNotificationCount}
          action={() => {
            history.push('/');
          }}
          icon={{
            active: bn_latest_active,
            inactive: bn_latest,
            altText: 'Rhombus',
          }}
        />
        <BottomNavButton
          label="Activities"
          isActive={selected === 'activities'}
          action={() => {
            history.push('/activities');
          }}
          icon={{
            active: bn_activities_active,
            inactive: bn_activities,
            altText: 'Calendar',
          }}
        />
        <BottomNavButton
          label="Food"
          isActive={selected === 'food'}
          action={() => {
            if (shouldViewFoodOnboarding) {
              history.push('/onboarding/choose-meals');
            } else if (foodOrderExists) {
              history.push('/food/order-summary');
            } else {
              history.push('/food');
            }
          }}
          icon={{
            active: bn_cutlery_active,
            inactive: bn_cutlery,
            altText: 'Fork and Knife',
          }}
        />
        <BottomNavButton
          label="Folks"
          isActive={selected === 'folks'}
          action={() => {
            history.push('/folks');
          }}
          icon={{
            active: bn_folks_active,
            inactive: bn_folks,
            altText: 'Users',
          }}
        />
        <BottomNavButton
          label="Rewards"
          isActive={selected === 'rewards'}
          notificationCount={rewardsNotificationCount}
          onlyShowNotificationDot={true}
          action={() => {
            if (shouldViewRewardsOnboarding) {
              history.push('/onboarding/celebrate-wins');
            } else {
              history.push('/rewards');
            }
          }}
          icon={{
            active: bn_rewards_active,
            inactive: bn_rewards,
            altText: 'Gift Card',
          }}
        />
      </nav>
    </footer>
  );
};

const BottomNavButton = ({
  label,
  icon,
  isActive,
  action,
  notificationCount = 0,
  onlyShowNotificationDot = false,
}) => {
  const navButtonClicked = () => {
    action();
  };

  return (
    <button
      type="button"
      className={classnames(styles.button, { [styles.active]: isActive })}
      onClick={navButtonClicked}
    >
      {notificationCount > 0 && (
        <div className={styles.badge_wrapper}>
          <div className={styles.badge_inner_wrapper}>
            <Badge
              text={
                (onlyShowNotificationDot && ' ') ||
                (notificationCount <= 10 ? notificationCount : '10+')
              }
              theme={badgeThemes.fusionYellow}
            />
          </div>
        </div>
      )}
      <img src={isActive ? icon.active : icon.inactive} alt={icon.altText} />
      <p className={styles.button_label}>{label}</p>
    </button>
  );
};
