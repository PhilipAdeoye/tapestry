import React from 'react';
import { useHistory } from 'react-router-dom';
import { AppBar } from '../../app/AppBars/AppBar';
import { BackButton } from '../../app/Buttons/BackButton';
import { HelpButton } from '../../app/Buttons/HelpButton';
import { MainContainer } from '../../app/Containers/MainContainer';
import { SlideUpCSS } from '../../app/CSSTransitions/SlideUpCSS';
import { BigIconWithText } from '../../app/Headings/BigIconWithText';
import { StatusBarControls } from './StatusBar/StatusBarControls';
import cash_register from '../../images/cash_register.svg';
import { Body } from '../../app/Containers/Body';
import { useSelector } from 'react-redux';
import BottomSheet from '../../app/Containers/BottomSheet';
import { Empty } from '../../app/Misc/Empty';
import {
  columnOptions,
  Gallery,
  GalleryItem,
} from '../../app/Containers/Gallery';
import { SummaryItem } from './SummaryItem';
import styles from './Checkout.module.css';
import { StatusBar } from '../../app/AppBars/StatusBar';

export const Checkout = () => {
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

  const totalCost = cartItems.reduce((acc, item) => acc + item.price, 0);

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
              image={cash_register}
              imgAlt="A cash register"
              text="Checkout"
            />
            {itemCount ? (
              <BottomSheet
                title={
                  itemCount === 1 ? `${itemCount} item` : `${itemCount} items`
                }
              >
                <Gallery>
                  {Object.keys(groupedItems).map((key) => (
                    <GalleryItem key={key} maxColumns={columnOptions.one}>
                      <SummaryItem
                        name={groupedItems[key].name}
                        image={groupedItems[key].image}
                        qty={groupedItems[key].count}
                        cost={groupedItems[key].price * groupedItems[key].count}
                      />
                    </GalleryItem>
                  ))}
                  <CheckoutTotal amount={totalCost} />
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

const CheckoutTotal = ({ amount }) => {
  return (
    <div className={styles.total_wrapper}>
      <div className={styles.total_details}>
        <span>Total Cost</span>
        <span className={styles.total}>{amount}</span>
      </div>
    </div>
  );
};
