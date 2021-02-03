import { createSlice } from "@reduxjs/toolkit";

// Initial State
const initialState = {
  orders: [],
  items: [
    {
      id: 10,
      name: "Stainless Steel Cookware Set",
      description: "",
      price: 1000,
      image: "https://i.imgur.com/ua61lkz.jpg",
    },
    {
      id: 20,
      name: "Measuring Cups",
      description: "",
      price: 350,
      image: "https://i.imgur.com/yrOi0KF.jpg",
    },
    {
      id: 30,
      name: "Hydromate Water Bottle",
      description: "",
      price: 500,
      image: "https://i.imgur.com/nwuRRsq.jpg",
    },
    {
      id: 40,
      name: "Apple Watch",
      description: "",
      price: 5000,
      image: "https://i.imgur.com/TBEgs1c.jpg",
    },
    {
      id: 50,
      name: "Catered Dinner by Chef Sebastian",
      description: "",
      price: 5000,
    },
    {
      id: 51,
      name: "In-store shopping with Coach Liz",
      description: "",
      price: 10000,
    },
    {
      id: 60,
      name: "Minimalism Makeover with Mari Kondo",
      description: "A diminutive Japanese woman puts your house in order",
      price: 100000,
    },
    {
      id: 70,
      name: "Wooden Cutlery",
      description: "",
      price: 500,
      image: "https://i.imgur.com/qm8yXky.jpg",
    },
    {
      id: 80,
      name: "Chef's Knife",
      description: "",
      price: 500,
      image: "https://i.imgur.com/fAvXhMJ.jpg",
    },
    {
      id: 90,
      name: "Cutting Board",
      description: "",
      price: 500,
      image: "https://i.imgur.com/BsOTK5h.jpg",
    },
    {
      id: 100,
      name: "Multi-colored Mixing Bowls",
      description: "",
      price: 500,
      image: "https://i.imgur.com/EYQYazA.jpg",
    },
    {
      id: 110,
      name: "Oven Mitts",
      description: "",
      price: 500,
      image: "https://i.imgur.com/mzR2d4A.jpg",
    },
    {
      id: 120,
      name: "Pan with Handle",
      description: "",
      price: 500,
      image: "https://i.imgur.com/TbhxUqj.jpg",
    },
  ],
};

// Slice of state and reducers
const giftShopSlice = createSlice({
  name: "giftShop",
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
