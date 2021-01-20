import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import modalReducer from '../features/Modal/modalSlice';
import careTeamReducer from '../features/CareTeam/careTeamSlice';
import activitiesReducer from '../features/Activities/activitiesSlice';
import rewardsReducer from '../features/Rewards/rewardsSlice';
import wishlistReducer from '../features/GiftShop/wishlistSlice';
import giftShopReducer from '../features/GiftShop/giftShopSlice';
import cartReducer from '../features/GiftShopCart/cartSlice';
import foodReducer from '../features/Food/foodSlice';
import metaReducer from '../features/Shared/metaSlice';
import feedReducer from '../features/Home/feedSlice';

export default configureStore({
  reducer: {
    modal: modalReducer,
    careTeam: careTeamReducer,
    meta: metaReducer,
    rewards: rewardsReducer,
    wishlist: wishlistReducer,
    giftShop: giftShopReducer,
    cart: cartReducer,
    activities: activitiesReducer,
    food: foodReducer,
    feed: feedReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      // Ignore these action types
      ignoredActions: ['modal/show', 'modal/hide', 'modal/disappear'],
    },
  }),
});
