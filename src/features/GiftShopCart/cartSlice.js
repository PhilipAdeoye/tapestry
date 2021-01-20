import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      state.items.push(item);
    },
    removeAllWithItemId(state, action) {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.item_id !== itemId);
    },
    emptyCart(state, action) {
      state.items = [];
    },
  },
});

export const { addToCart, removeAllWithItemId, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;
