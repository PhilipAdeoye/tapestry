import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profilePic: "https://i.imgur.com/TXLsaCz.png",
  userName: "Sybil",
  userId: 1000,
  hiliCoachName: "Coach Liz",
  hiliCoachImage: "https://i.imgur.com/i7Emgxj.jpg",
  hiliCoachUserId: 2,
  shouldUseFoodCart: false,
  hasViewedAppOnboarding: false,
  hasViewedFoodOnboarding: false,
  hasViewedRewardsOnboarding: false,
};

const metaSlice = createSlice({
  name: "meta",
  initialState,
  reducers: {
    markAppOnboardingAsViewed(state) {
      state.hasViewedAppOnboarding = true;
    },
    markFoodOnboardingAsViewed(state) {
      state.hasViewedFoodOnboarding = true;
    },
    markRewardsOnboardingAsViewed(state) {
      state.hasViewedRewardsOnboarding = true;
    },
  },
});

export const {
  markAppOnboardingAsViewed,
  markFoodOnboardingAsViewed,
  markRewardsOnboardingAsViewed,
} = metaSlice.actions;

export default metaSlice.reducer;
