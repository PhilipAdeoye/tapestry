import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lifetimePoints: 0,
  points: 0,
  foodOrderOppos: { currentVal: 1, max: 20 },
  eventRSVPOppos: { currentVal: 3, max: 60 },
  participationOppos: { currentVal: 3, max: 60 },
  socialOppos: { currentVal: 6, max: 120 },
  foodVarietyOppos: { currentVal: 1, max: 6 },
};

const rewardsSlice = createSlice({
  name: 'rewards',
  initialState,
  reducers: {
    subtractPoints(state, action) {
      const points = action.payload;
      state.points = state.points - points;
    },
    addPoints(state, action) {
      const points = action.payload;
      state.points = state.points + points;
    },
    updateLifetimePoints(state, action) {
      const points = action.payload;
      state.lifetimePoints = state.lifetimePoints + points;
    },
  },
});

export const {
  subtractPoints,
  addPoints,
  updateLifetimePoints,
} = rewardsSlice.actions;

export default rewardsSlice.reducer;
