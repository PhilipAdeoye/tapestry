import React from 'react';
import { useHistory } from 'react-router-dom';
import { AppBar } from '../../app/AppBars/AppBar';
import { BackButton } from '../../app/Buttons/BackButton';
import { HelpButton } from '../../app/Buttons/HelpButton';
import { MainContainer } from '../../app/Containers/MainContainer';
import { SlideUpCSS } from '../../app/CSSTransitions/SlideUpCSS';
import { BigIconWithText } from '../../app/Headings/BigIconWithText';
import { StatusBarControls } from '../GiftShop/StatusBar/StatusBarControls';
import shopping_cart from '../../images/shopping_cart.svg';
import { Body } from '../../app/Containers/Body';
import { Empty } from '../../app/Misc/Empty';
import { useSelector } from 'react-redux';
import BottomSheet from '../../app/Containers/BottomSheet';
import {
  columnOptions,
  Gallery,
  GalleryItem,
} from '../../app/Containers/Gallery';
import { Card } from '../../app/Containers/Card/Card';
import { CartItem } from './CartItem';
import { StatusBar } from '../../app/AppBars/StatusBar';

export const Cart = () => {
  const history = useHistory();
  const cartItems = useSelector((state) => state.cart.items);
  const itemCount = cartItems.length;

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

  return (
    <>
      <AppBar
        left={<BackButton action={() => history.push('/giftshop')} />}
        right={<HelpButton />}
      />
      <MainContainer>
        <SlideUpCSS>
          <Body>
            <BigIconWithText
              image={shopping_cart}
              imgAlt="Filled up shopping cart"
              text="Cart"
            />
            {itemCount ? (
              <BottomSheet
                title={
                  itemCount === 1 ? `${itemCount} item` : `${itemCount} items`
                }
              >
                <Gallery>
                  {Object.keys(groupedItems).map((key) => (
                    <GalleryItem key={key} maxColumns={columnOptions.two}>
                      <Card>
                        <CartItem
                          name={groupedItems[key].name}
                          image={groupedItems[key].image}
                          qty={groupedItems[key].count}
                          price={groupedItems[key].price}
                          itemId={groupedItems[key].item_id}
                        />
                      </Card>
                    </GalleryItem>
                  ))}
                </Gallery>
              </BottomSheet>
            ) : (
              <Empty info="Add items from the Gift Shop or your wishlist" />
            )}
          </Body>
        </SlideUpCSS>
      </MainContainer>
      <StatusBar>
        <StatusBarControls />
      </StatusBar>
    </>
  );
};
