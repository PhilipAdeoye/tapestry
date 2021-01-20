import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist(state, action) {
      const item = action.payload;
      if (state.items.filter((x) => x.item_id === item.item_id).length === 0) {
        state.items.push(item);
      }
    },
    removeFromWishlistWithItemId(state, action) {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.item_id !== itemId);
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlistWithItemId,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
