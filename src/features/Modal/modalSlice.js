import { createSlice } from '@reduxjs/toolkit';

// enum
export const visibilityStates = {
  show: 'show',
  hide: 'hide',
  none: '',
};

// Initial State
const initialState = {
  visibility: visibilityStates.none,
  content: '',
};

// Slice of state and reducers
const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    show(state, action) {
      const { content } = action.payload;
      state.content = content;
      state.visibility = visibilityStates.show;
    },
    hide(state) {
      state.visibility = visibilityStates.hide;
    },
    disappear(state) {
      state.visibility = visibilityStates.none;
      // Actually empty out the modal
      state.content = '';
    },
  },
});

// Export actions
export const { show, hide, disappear } = modalSlice.actions;

// Export reducers
export default modalSlice.reducer;
