import { createSlice } from '@reduxjs/toolkit';

// Initial State
const initialState = {
  orders: [],
  items: [
    {
      id: 1,
      name: 'Stainless Steel Cookware Set',
      description: '',
      price: 1000,
      image: 'https://i.imgur.com/ua61lkz.jpg',
    },
    {
      id: 2,
      name: 'Measuring Cups',
      description: '',
      price: 350,
      image: 'https://i.imgur.com/yrOi0KF.jpg',
    },
    {
      id: 3,
      name: 'Hydromate Water Bottle',
      description: '',
      price: 500,
      image: 'https://i.imgur.com/nwuRRsq.jpg',
    },
    {
      id: 4,
      name: 'Apple Watch',
      description: '',
      price: 5000,
      image: 'https://i.imgur.com/TBEgs1c.jpg',
    },
    {
      id: 5,
      name: 'Catered Dinner by Chef Sebastian',
      description: '',
      price: 5000,
    },
    {
      id: 6,
      name: 'Playtime with Grandkids',
      description: '',
      price: 10000,
    },
  ],
};

// Slice of state and reducers
const giftShopSlice = createSlice({
  name: 'giftShop',
  initialState,
  reducers: {
    placeOrder(state, action) {
      const item = action.payload;
      state.orders.push(item);
    },
  },
});

export const { placeOrder } = giftShopSlice.actions;

// Export reducers
export default giftShopSlice.reducer;
