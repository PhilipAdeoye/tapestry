import { createSlice } from "@reduxjs/toolkit";

// enum
export const visibilityStates = {
  show: "show",
  hide: "hide",
  none: "",
};

// Initial State
const initialState = {
  visibility: visibilityStates.none,
  content: "",
};

// Slice of state and reducers
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal(state, action) {
      const { content } = action.payload;
      state.content = content;
      state.visibility = visibilityStates.show;
    },
    hideModal(state) {
      state.visibility = visibilityStates.hide;
    },
    disappear(state) {
      state.visibility = visibilityStates.none;
      // Actually empty out the modal
      state.content = "";
    },
  },
});

// Export actions
export const { showModal, hideModal, disappear } = modalSlice.actions;

// Export reducers
export default modalSlice.reducer;
