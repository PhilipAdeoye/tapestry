import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profilePic: "https://i.imgur.com/TXLsaCz.png",
  userName: "Sybil",
  userId: 1000,
  hiliCoachName: "Coach Liz",
  hiliCoachImage: "https://i.imgur.com/7ZbKZEn.jpg",
  hiliCoachUserId: 2,
  shouldUseFoodCart: false,
  hasViewedAppOnboarding: true,
  hasViewedFoodOnboarding: true,
  hasViewedRewardsOnboarding: true,
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
