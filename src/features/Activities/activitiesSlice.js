import { createSlice } from '@reduxjs/toolkit';
import {
  addHours,
  formatISO,
  startOfTomorrow,
  startOfYesterday,
} from 'date-fns';
import { endOfHour, startOfHour } from 'date-fns';

export const activityViews = {
  upcoming: 'Upcoming',
  going: 'Going',
  past: 'Past',
};

export const joinOptions = {
  taxi: 'taxi',
  car: 'car',
  zoom: 'zoom',
};

const items = [
  //   In the past
  {
    id: 1,
    eventId: 1,
    startsAt: formatISO(addHours(startOfYesterday(), 15)),
    endsAt: formatISO(addHours(startOfYesterday(), 16)),
    title: 'Cooking with Chef Sebastian #1',
    pointsReward: 50,
    willAttend: true,
    hostedByCoachImg: 'https://i.imgur.com/m3dPTep.jpg',
    hostedByCoachName: 'Chef Sebastian',
    desc: '',
    address: '',
    joinUrl: '',
    isJoinableInPerson: true,
    isJoinableViaVideo: true,
    isJoiningBy: joinOptions.zoom,
    canRSVP: false,
  },
  {
    id: 5,
    eventId: 5,
    startsAt: formatISO(addHours(startOfYesterday(), 14)),
    endsAt: formatISO(addHours(startOfYesterday(), 15)),
    title: 'Workout with Coach Amelia #1',
    pointsReward: 50,
    willAttend: true,
    hostedByCoachImg: 'https://i.imgur.com/qjyZyL6.jpg',
    hostedByCoachName: 'Coach Amelia',
    desc: '',
    address: 'Eskenazi Health Forest Manor',
    joinUrl: '',
    isJoinableInPerson: false,
    isJoinableViaVideo: false,
    isJoiningBy: joinOptions.zoom,
    canRSVP: false,
  },
  // Ongoing
  {
    id: 4,
    eventId: 4,
    startsAt: formatISO(startOfHour(new Date())),
    endsAt: formatISO(endOfHour(new Date())),
    title: 'Catch up with RD Gertrude',
    pointsReward: 40,
    willAttend: true,
    hostedByCoachImg: 'https://i.imgur.com/QPRsusb.jpg',
    hostedByCoachName: 'RD Gertrude',
    desc: '',
    address: '',
    joinUrl: '',
    isJoinableInPerson: true,
    isJoinableViaVideo: true,
    isJoiningBy: joinOptions.taxi,
    canRSVP: false,
  },
  // Upcoming
  {
    id: 2,
    eventId: 2,
    startsAt: formatISO(addHours(startOfTomorrow(), 15)),
    endsAt: formatISO(addHours(startOfTomorrow(), 16)),
    title: 'Cooking with Chef Sebastian #2',
    pointsReward: 50,
    willAttend: null,
    hostedByCoachImg: 'https://i.imgur.com/m3dPTep.jpg',
    hostedByCoachName: 'Chef Sebastian',
    desc: '',
    address: '',
    joinUrl: '',
    isJoinableInPerson: true,
    isJoinableViaVideo: true,
    isJoiningBy: joinOptions.taxi,
    canRSVP: true,
  },
  {
    id: 3,
    eventId: 3,
    startsAt: formatISO(addHours(startOfTomorrow(), 38)),
    endsAt: formatISO(addHours(startOfTomorrow(), 39)),
    title: 'Workout with Coach Amelia #2',
    pointsReward: 50,
    willAttend: null,
    hostedByCoachImg: 'https://i.imgur.com/qjyZyL6.jpg',
    hostedByCoachName: 'Coach Amelia',
    desc: '',
    address: 'Eskenazi Health Forest Manor',
    joinUrl: '',
    isJoinableInPerson: false,
    isJoinableViaVideo: true,
    isJoiningBy: joinOptions.zoom,
    canRSVP: true,
  },
];

// Slice of state and reducers
const activitiesSlice = createSlice({
  name: 'activities',
  initialState: {
    selectedView: activityViews.upcoming,
    items,
  },
  reducers: {
    viewUpcomingActivities(state, action) {
      state.selectedView = activityViews.upcoming;
    },
    viewGoingActivities(state, action) {
      state.selectedView = activityViews.going;
    },
    viewPastActivities(state, action) {
      state.selectedView = activityViews.past;
    },
    willAttendEvent(state, action) {
      const id = action.payload;
      const event = state.items.find((item) => item.id === id);
      if (event) {
        event.willAttend = true;
        state.items = [event, ...state.items.filter((item) => item.id !== id)];
      }
    },
    willNotAttendEvent(state, action) {
      const id = action.payload;
      const event = state.items.find((item) => item.id === id);
      if (event) {
        event.willAttend = false;
        state.items = [event, ...state.items.filter((item) => item.id !== id)];
      }
    },
    willMaybeAttendEvent(state, action) {
      const id = action.payload;
      const event = state.items.find((item) => item.id === id);
      if (event) {
        event.willAttend = null;
        state.items = [event, ...state.items.filter((item) => item.id !== id)];
      }
    },
    joinEventBy(state, action) {
      const { id, method } = action.payload;
      const event = state.items.find((item) => item.id === id);
      if (
        event &&
        [joinOptions.zoom, joinOptions.car, joinOptions.taxi].includes(method)
      ) {
        event.isJoiningBy = method;
        state.items = [event, ...state.items.filter((item) => item.id !== id)];
      }
    },
  },
});

// Export actions
export const {
  viewUpcomingActivities,
  viewGoingActivities,
  viewPastActivities,
  willAttendEvent,
  willNotAttendEvent,
  willMaybeAttendEvent,
  joinEventBy,
} = activitiesSlice.actions;

// Export reducers
export default activitiesSlice.reducer;
