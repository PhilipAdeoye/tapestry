import { createSlice } from "@reduxjs/toolkit";

// Slice of state and reducers
const careTeamSlice = createSlice({
  name: "careTeam",
  initialState: {
    teamMembers: [
      {
        id: "1",
        name: "Coach Liz",
        role: "HILI Coach",
        image: "https://i.imgur.com/i7Emgxj.jpg",
      },
      {
        id: "11",
        name: "Coach Amelia",
        role: "Workout Coach",
        image: "https://i.imgur.com/qjyZyL6.jpg",
      },
      {
        id: "20",
        name: "Doctor Ravi",
        role: "Primary Care",
        image: "https://i.imgur.com/xtAIENh.jpg",
      },
      {
        id: "30",
        name: "Chef Sebastian",
        role: "Chef",
        image: "https://i.imgur.com/m3dPTep.jpg",
      },
      {
        id: "40",
        name: "RD Gertrude",
        role: "Registered Dietician",
        image: "https://i.imgur.com/QPRsusb.jpg",
      },
    ],
  },
  reducers: {},
});

// Export actions
export const { show, hide, disappear } = careTeamSlice.actions;

// Export reducers
export default careTeamSlice.reducer;
