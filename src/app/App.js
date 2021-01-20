import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Karousel } from '../features/Onboarding/Karousel';
import { Modal } from '../features/Modal/Modal';
import { Home } from '../features/Home/Home';
import { CareTeam } from '../features/CareTeam/CareTeam';
import { RewardHub } from '../features/Rewards/RewardHub';
import { Opportunities } from '../features/Opportunities/Opportunities';
import { GiftShop } from '../features/GiftShop/GiftShop';
import { Cart } from '../features/GiftShopCart/Cart';
import { Wishlist } from '../features/GiftShop/Wishlist';
import { OrderHistory } from '../features/GiftShop/OrderHistory';
import { Checkout } from '../features/GiftShop/Checkout';
import { Activities } from '../features/Activities/Activities';
import { ChooseFoods } from '../features/Food/ChooseFoods';
import { PackageView } from '../features/Food/PackageView';
import { FoodCart } from '../features/FoodCart/FoodCart';
import { BallotBox } from '../features/FoodVote/BallotBox';
import { OrderSummary } from '../features/Food/OrderSummary';
import { useSelector } from 'react-redux';
import { Demo } from './Demo';
import { NotFound } from './NotFound';

function App() {
  const foodOrderExists = !!useSelector((state) => state.food.order);
  const shouldViewAppOnboarding = !useSelector(
    (state) => state.meta.hasViewedAppOnboarding
  );

  return (
    <>
      <Demo />
      <Switch>
        <Route exact path="/folks">
          <CareTeam />
        </Route>
        <Route exact path="/food">
          <ChooseFoods />
        </Route>
        <Route exact path="/food/view-package">
          <PackageView />
        </Route>

        <Route exact path="/food/cart">
          <FoodCart />
        </Route>
        {foodOrderExists && (
          <Route exact path="/food/order-summary">
            <OrderSummary />
          </Route>
        )}
        <Route exact path="/food/ballot-box">
          <BallotBox />
        </Route>
        <Route exact path="/rewards">
          <RewardHub />
        </Route>
        <Route exact path="/activities">
          <Activities />
        </Route>
        <Route exact path="/opportunities">
          <Opportunities />
        </Route>
        <Route exact path="/giftshop">
          <GiftShop />
        </Route>
        <Route exact path="/giftshop/cart">
          <Cart />
        </Route>
        <Route exact path="/giftshop/wishlist">
          <Wishlist />
        </Route>
        <Route exact path="/giftshop/order_history">
          <OrderHistory />
        </Route>
        <Route exact path="/giftshop/checkout">
          <Checkout />
        </Route>

        <Route exact path="/">
          {!shouldViewAppOnboarding && <Home />}
          {shouldViewAppOnboarding && <Redirect to="/onboarding/welcome" />}
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
      <Karousel />
      <Modal />
    </>
  );
}

export default App;
