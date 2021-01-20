import React from 'react';
import { MdArrowForward } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrder } from '../giftShopSlice';
import { format } from 'date-fns';
import { emptyCart } from '../../GiftShopCart/cartSlice';
import { show } from '../../Modal/modalSlice';
import { OrderCompletePrompt } from '../OrderCompletePrompt';
import { useHistory } from 'react-router-dom';
import { OutlinedButton } from '../../../app/Buttons/OutlinedButton';

export const PlaceOrderButton = () => {
  const history = useHistory();

  const cartItems = useSelector((state) => state.cart.items);
  const totalCost = cartItems.reduce((acc, item) => acc + item.price, 0);

  const groupedItems = cartItems.reduce((acc, item) => {
    acc[item.item_id] = acc[item.item_id] || {
      name: item.name,
      image: item.image,
      price: item.price,
      item_id: item.item_id,
      count: 0,
    };
    acc[item.item_id].count++;
    return acc;
  }, {});

  const dispatch = useDispatch();

  const handleClick = () => {
    const items = Object.keys(groupedItems).map((key) => {
      return {
        item_id: key,
        name: groupedItems[key].name,
        image: groupedItems[key].image,
        count: groupedItems[key].count,
        cost: groupedItems[key].price * groupedItems[key].count,
      };
    });

    dispatch(
      placeOrder({
        items,
        isDelivered: false,
        orderPlacedOn: format(new Date(), 'MMM d, yyyy'),
        totalCost,
      })
    );

    dispatch(emptyCart());
    history.push('/giftshop/order_history');

    dispatch(show({ content: <OrderCompletePrompt /> }));
  };

  return (
    <OutlinedButton
      text="Place Order"
      icon={<MdArrowForward />}
      action={handleClick}
      shrinkOnSmallScreens={true}
    />
  );
};
