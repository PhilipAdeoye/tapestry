import React from 'react';
import { useHistory } from 'react-router-dom';
import { AppBar } from '../../app/AppBars/AppBar';
import { BackButton } from '../../app/Buttons/BackButton';
import { HelpButton } from '../../app/Buttons/HelpButton';
import { MainContainer } from '../../app/Containers/MainContainer';
import { SlideUpCSS } from '../../app/CSSTransitions/SlideUpCSS';
import { BigIconWithText } from '../../app/Headings/BigIconWithText';
import processing from '../../images/processing.svg';
import { Body } from '../../app/Containers/Body';
import { Empty } from '../../app/Misc/Empty';
import { useSelector } from 'react-redux';
import BottomSheet from '../../app/Containers/BottomSheet';
import styles from './OrderHistory.module.css';
import { MinorHeading } from '../../app/Headings/MinorHeading';
import { SummaryItem } from './SummaryItem';

export const OrderHistory = () => {
  const history = useHistory();
  const orders = useSelector((state) => state.giftShop.orders);
  const orderCount = orders.length;

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
              image={processing}
              imgAlt="An hourglass inside a circular arrow"
              text="Order History"
            />
            {orderCount ? (
              <BottomSheet
                title={
                  orderCount === 1
                    ? `${orderCount} order`
                    : `${orderCount} orders`
                }
              >
                <div className={styles.orders_container}>
                  {orders.map((order, index) => (
                    <div key={index} className={styles.order_wrapper}>
                      {/* Display the order heading */}
                      <div className={styles.order_heading}>
                        <MinorHeading text={order.orderPlacedOn} />
                        {!order.isDelivered && (
                          <span className={styles.delivery_status}>
                            To Be Delivered
                          </span>
                        )}
                      </div>
                      {/* // Display the order items */}
                      {order.items.map((item, index) => (
                        <div key={index} className={styles.order_item_wrapper}>
                          <SummaryItem
                            name={item.name}
                            image={item.image}
                            qty={item.count}
                            cost={item.cost}
                          />
                        </div>
                      ))}
                      {/* Display the order total */}
                      <div className={styles.total_wrapper}>
                        <div className={styles.total_details}>
                          <span>Total Cost</span>
                          <span className={styles.total}>
                            {order.totalCost}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </BottomSheet>
            ) : (
              <Empty info="Place an order in the Gift Shop and it will show up here" />
            )}
          </Body>
        </SlideUpCSS>
      </MainContainer>
    </>
  );
};
