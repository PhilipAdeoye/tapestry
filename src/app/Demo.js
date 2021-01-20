import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCohortRSVPItemToFeed,
  addComment,
  addMessageToFeed,
  addRewardItemToFeed,
  toggleCohortItemLike,
} from '../features/Home/feedSlice';
import {
  addPoints,
  updateLifetimePoints,
} from '../features/Rewards/rewardsSlice';

export const Demo = () => {
  const dispatch = useDispatch();

  const hiliCoach = {
    name: useSelector((state) => state.meta.hiliCoachName),
    image: useSelector((state) => state.meta.hiliCoachImage),
    userId: useSelector((state) => state.meta.hiliCoachUserId),
  };

  //   Stuff that happens when component is mounted
  useEffect(() => {
    const marilyn = {
      image: 'https://i.imgur.com/uekoCCt.jpg',
      name: 'Marilyn',
    };
    const sebastian = {
      image: 'https://i.imgur.com/m3dPTep.jpg',
      name: 'Chef Sebastian',
      id: 1,
    };
    const amelia = {
      image: 'https://i.imgur.com/qjyZyL6.jpg',
      name: 'Coach Amelia',
      id: 2,
    };

    const addWelcomeMessageTimer = setTimeout(() => {
      // HILI Coach's welcome message
      dispatch(
        addMessageToFeed({
          text: `Welcome to HILI`,
          userId: hiliCoach.userId,
          userName: hiliCoach.name,
          imageURL: hiliCoach.image,
        })
      );
    }, 30000);

    // Marilyn's RSVP
    const itemId = 312;
    const addMarilynEventTimer = setTimeout(() => {
      dispatch(
        addCohortRSVPItemToFeed({
          id: itemId,
          imageURL: marilyn.image,
          userName: marilyn.name,
          eventId: 2,
        })
      );
    }, 45000);

    // Chef Sebastian's comment
    const addSebastianCommentTimer = setTimeout(() => {
      dispatch(
        addComment({
          id: itemId,
          userId: sebastian.id,
          userName: sebastian.name,
          imageURL: sebastian.image,
          text: 'Awesome! Looking forward to seeing you',
        })
      );
    }, 48000);

    const addSebastianLikeTimer = setTimeout(() => {
      dispatch(
        toggleCohortItemLike({
          id: itemId,
          userId: sebastian.id,
          userName: sebastian.name,
          imageURL: sebastian.image,
        })
      );
    }, 50000);

    // Coach Amelia's Comment
    const addAmeliaCommentTimer = setTimeout(() => {
      dispatch(
        addComment({
          id: itemId,
          userId: amelia.id,
          userName: amelia.name,
          imageURL: amelia.image,
          text: 'Yay!',
        })
      );
    }, 53000);

    const addAmeliaLikeTimer = setTimeout(() => {
      dispatch(
        toggleCohortItemLike({
          id: itemId,
          userId: amelia.id,
          userName: amelia.name,
          imageURL: amelia.image,
        })
      );
    }, 56000);

    const addSpendingPointsTimer = setTimeout(() => {
      dispatch(addPoints(19995));
      dispatch(updateLifetimePoints(19995));
      dispatch(
        addRewardItemToFeed({
          points: '20K',
          message: `Here's some starting capital to hit up the Gift Shop with. Also, don't end sentences with prepositions`,
        })
      );
    }, 90000);

    // Stuff that happens when unmounting
    return () => {
      clearTimeout(addWelcomeMessageTimer);
      clearTimeout(addMarilynEventTimer);
      clearTimeout(addSebastianCommentTimer);
      clearTimeout(addSebastianLikeTimer);
      clearTimeout(addAmeliaCommentTimer);
      clearTimeout(addAmeliaLikeTimer);
      clearTimeout(addSpendingPointsTimer);
    };
  }, [dispatch, hiliCoach.name, hiliCoach.image, hiliCoach.userId]);

  return null;
};
