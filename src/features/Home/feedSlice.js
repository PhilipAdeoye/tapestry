import { createSlice } from '@reduxjs/toolkit';
import { formatISO } from 'date-fns';
import { getInclusiveRandomInteger } from '../../utils';

export const feedItemType = {
  reward: 'reward',
  RSVP: 'RSVP',
  cohortRSVP: 'cohortRSVP',
  message: 'message',
};

export const cannedComments = [
  'Way to go!',
  'See you there!',
  'Awesome, me too!',
  'Yes!',
];

// Slice of state and reducers
const feedSlice = createSlice({
  name: 'feed',
  initialState: {
    lastVisit: '2021/01/01',
    lastVisitedRewardsHub: '2021/01/01',
    items: [],
  },
  reducers: {
    updateLastVisit(state) {
      state.lastVisit = formatISO(new Date());
    },
    updateLastVisitedRewardsHub(state) {
      state.lastVisitedRewardsHub = formatISO(new Date());
    },
    toggleLike(state, action) {
      const { id, type } = action.payload;
      const item = state.items.find((x) => x.id === id && x.type === type);
      if (item) {
        if (!!item.likedAt) {
          item.likedAt = null;
        } else {
          item.likedAt = formatISO(new Date());
        }
        state.items = [item, ...state.items.filter((x) => x.id !== id)];
      }
    },
    removeRSVPFeedItem(state, action) {
      const { eventId } = action.payload;
      const item = state.items.find(
        (x) => x.type === feedItemType.RSVP && x.eventId === eventId
      );
      if (item) {
        state.items = state.items.filter((x) => x.id !== item.id);
      }
    },
    addRSVPFeedItem(state, action) {
      const { eventId } = action.payload;
      const item = state.items.find(
        (x) => x.type === feedItemType.RSVP && x.eventId === eventId
      );
      if (!item) {
        const newRSVPItem = {
          id: getInclusiveRandomInteger(1000, Number.MAX_SAFE_INTEGER),
          createdAt: formatISO(new Date()),
          type: feedItemType.RSVP,
          eventId,
        };
        state.items.push(newRSVPItem);
      }
    },
    addCohortRSVPItemToFeed(state, action) {
      const { eventId, userName, imageURL, id } = action.payload;
      const item = state.items.find((x) => x.id === id);

      if (!item) {
        state.items.push({
          // id: getInclusiveRandomInteger(1000, Number.MAX_SAFE_INTEGER),
          id,
          createdAt: formatISO(new Date()),
          type: feedItemType.cohortRSVP,
          imageURL,
          userName,
          eventId,
          likes: [],
          comments: [],
        });
      }
    },
    toggleCohortItemLike(state, action) {
      const { id, userId, userName, imageURL } = action.payload;
      const item = state.items.find((x) => x.id === id);

      if (item) {
        if (item.likes.find((l) => l.userId === userId)) {
          item.likes = item.likes.filter((l) => l.userId !== userId);
        } else {
          item.likes.push({
            userId,
            userName,
            imageURL,
            createdAt: formatISO(new Date()),
          });
        }
      }
    },
    addComment(state, action) {
      const { id, userId, userName, imageURL, text } = action.payload;
      const item = state.items.find((x) => x.id === id);

      if (item) {
        item.comments.push({
          userId,
          userName,
          imageURL,
          text,
          createdAt: formatISO(new Date()),
        });
      }
    },
    addRewardItemToFeed(state, action) {
      const { points, message } = action.payload;

      state.items.push({
        id: getInclusiveRandomInteger(1000, Number.MAX_SAFE_INTEGER),
        type: feedItemType.reward,
        createdAt: formatISO(new Date()),
        likedAt: null,
        rewardInPoints: points,
        rewardMessage: message,
      });
    },
    addMessageToFeed(state, action) {
      const { text, userId, userName, imageURL } = action.payload;

      state.items.push({
        id: getInclusiveRandomInteger(1000, Number.MAX_SAFE_INTEGER),
        createdAt: formatISO(new Date()),
        type: feedItemType.message,
        text,
        userId,
        userName,
        imageURL,
        likedAt: null,
      });
    },
  },
});

// Export actions
export const {
  updateLastVisit,
  toggleLike,
  removeRSVPFeedItem,
  addRSVPFeedItem,
  toggleCohortItemLike,
  addComment,
  addRewardItemToFeed,
  addMessageToFeed,
  addCohortRSVPItemToFeed,
  updateLastVisitedRewardsHub,
} = feedSlice.actions;

// Export reducers
export default feedSlice.reducer;
