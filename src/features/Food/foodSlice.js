import { createSlice } from "@reduxjs/toolkit";
import { format, addDays, startOfToday } from "date-fns";
import { getInclusiveRandomInteger } from "../../utils";

// Initial State
const initialState = {
  orderWillBePlacedOn: format(addDays(startOfToday(), 3), "yyyy/MM/dd"),
  orderTime: "12:00 PM",
  itemsWillBeDeliveredOn: format(addDays(startOfToday(), 6), "yyyy/MM/dd"),
  currentOrderSequence: 1,
  isSkippingOrder: false,
  referenceOrder: {
    Meal: 10,
    Snack: 5,
  },
  cart: {
    items: [],
  },
  ballotBox: {
    items: [],
  },
  // Commented out just to show the shape
  // order: {
  //   id: 1,
  //   deliveryDate: format(addDays(startOfToday(), 6), 'yyyy/MM/dd'),
  //   label: 'Starter Package',
  //   sponsoredByCoachName: 'Coach Maddie',
  //   sponsoredByCoachImage: 'https://i.imgur.com/XIZFCfX.png',
  //   items: [ ],
  // },
  package: {
    id: 1,
    label: "Starter Package",
    sponsoredByCoachName: "Coach Liz",
    sponsoredByCoachImage: "https://i.imgur.com/i7Emgxj.jpg",
    items: [
      // Meals
      {
        id: 10,
        name: "BBQ",
        type: "Meal",
        image: "https://i.imgur.com/KY8tkeQ.jpg",
        count: 2,
      },
      {
        id: 20,
        name: "Fruit Salad",
        type: "Meal",
        image: "https://i.imgur.com/gVWtQ4s.jpg",
        count: 2,
      },
      {
        id: 30,
        name: "Whole Wheat Spaghetti with Ground Turkey",
        type: "Meal",
        image: "https://i.imgur.com/y7ki2gm.jpg",
        count: 1,
      },
      {
        id: 30,
        name: "Charcuterie Board",
        type: "Meal",
        image: "https://i.imgur.com/khYtsZP.jpg",
        count: 1,
      },
      {
        id: 40,
        name: "Roasted Sweet Potatoes",
        type: "Meal",
        image: "https://i.imgur.com/j7ieIbj.jpg",
        count: 1,
      },
      {
        id: 50,
        name: "Steak and Veggies",
        type: "Meal",
        image: "https://i.imgur.com/3VW06Un.jpg",
        count: 1,
      },
      {
        id: 60,
        name: "Salmon Slabs",
        type: "Meal",
        image: "https://i.imgur.com/Iji3kXo.jpg",
        count: 1,
      },
      {
        id: 70,
        name: "Meat and Potatoes",
        type: "Meal",
        image: "https://i.imgur.com/IcoyGGp.jpg",
        count: 1,
      },

      // Snacks
      {
        id: 80,
        name: "Fresh Blueberries",
        type: "Snack",
        image: "https://i.imgur.com/U1xgVIX.jpg",
        count: 2,
      },
      {
        id: 90,
        name: "Fresh Strawberries",
        type: "Snack",
        image: "https://i.imgur.com/ireha27.jpg",
        count: 1,
      },
      {
        id: 100,
        name: "Roasted Almonds",
        type: "Snack",
        image: "https://i.imgur.com/9dRbn5B.jpg",
        count: 1,
      },
      {
        id: 110,
        name: "Buncha Carrots",
        type: "Snack",
        image: "https://i.imgur.com/POaMmoK.jpg",
        count: 1,
      },
    ],
  },
};

// Slice of state and reducers
const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    skipOrder(state) {
      state.isSkippingOrder = true;
    },
    cancelSkip(state) {
      state.isSkippingOrder = false;
    },
    populateCartFromCurrentPackage(state, action) {
      state.cart.items = state.package.items;
    },
    resetCart(state, action) {
      state.cart.items = [];
    },
    updateCart(state, action) {
      const { id, count } = action.payload;
      const cartItem = state.cart.items.find((x) => x.id === id);
      if (cartItem) {
        cartItem.count = count;
        state.cart.items = [
          cartItem,
          ...state.cart.items.filter((x) => x.id !== id),
        ];
      }
    },
    stuffBallotBoxWithCurrentPackage(state, action) {
      state.ballotBox.items = state.package.items.map((x) => {
        return { approved: true, ...x };
      });
    },
    approveBallot(state, action) {
      const { id } = action.payload;
      const ballot = state.ballotBox.items.find((x) => x.id === id);
      if (ballot) {
        ballot.approved = true;
        state.ballotBox.items = [
          ballot,
          ...state.ballotBox.items.filter((x) => x.id !== id),
        ];
      }
    },
    disapproveBallot(state, action) {
      const { id } = action.payload;
      const ballot = state.ballotBox.items.find((x) => x.id === id);
      if (ballot) {
        ballot.approved = false;
        state.ballotBox.items = [
          ballot,
          ...state.ballotBox.items.filter((x) => x.id !== id),
        ];
      }
    },
    resetBallotBox(state, action) {
      state.ballotBox.items = [];
    },
    placeOrderWithBallotBox(state) {
      const approvedItemsByType = state.ballotBox.items
        .filter((x) => x.approved)
        .reduce((acc, food) => {
          acc[food.type] = acc[food.type] || {
            items: [],
          };
          // Put the food item { name, image, count, ...} into the accumulator's items for the food's type
          acc[food.type].items.push({ ...food, count: 0 });

          return acc;
        }, {});

      const foodTypes = Object.keys(approvedItemsByType);

      // Empty array for the order items
      let orderItems = [];

      // Loop over each food type
      for (let index = 0; index < foodTypes.length; index++) {
        const type = foodTypes[index];

        const maxSpots = state.referenceOrder[type];
        const numberOfFoods = approvedItemsByType[type].items.length;

        // Let's try to order at least one qty of each approved item,
        // but only up to the maximum nuber of spots. It's possible, we may not be
        // able to get one if the order size is less than the approved items
        let preOrderItems = [];
        for (let b = 0; b < numberOfFoods && b < maxSpots; b++) {
          const item = approvedItemsByType[type].items[b];
          item.count++;
          preOrderItems.push(item);
        }

        // If there are extra spots left over in the order after picking one of each item
        const vacantSpots = maxSpots - numberOfFoods;
        if (vacantSpots > 0) {
          const indicesOfApprovedItems = preOrderItems.length - 1;

          // randomly pick an approved item and bump up its count
          for (let c = 0; c < vacantSpots; c++) {
            preOrderItems[getInclusiveRandomInteger(0, indicesOfApprovedItems)]
              .count++;
          }
        }

        // Append the items for this food type into the order items array
        orderItems = [...orderItems, ...preOrderItems];
      }

      // Commit the order
      state.order = {
        deliveryDate: state.itemsWillBeDeliveredOn,
        items: orderItems,
      };
    },
    placeOrderWithPackage(state) {
      state.order = {
        ...state.package,
        deliveryDate: state.itemsWillBeDeliveredOn,
      };
    },
    placeOrderWithCart(state) {
      state.order = {
        deliveryDate: state.itemsWillBeDeliveredOn,
        items: state.cart.items.filter((x) => x.count),
      };
    },
  },
});

// Export actions
export const {
  populateCartFromCurrentPackage,
  updateCart,
  resetCart,
  stuffBallotBoxWithCurrentPackage,
  resetBallotBox,
  disapproveBallot,
  approveBallot,
  placeOrderWithPackage,
  placeOrderWithCart,
  placeOrderWithBallotBox,
  skipOrder,
  cancelSkip,
} = foodSlice.actions;

// Export reducers
export default foodSlice.reducer;
