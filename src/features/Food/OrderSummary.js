import React from 'react';
import { useSelector } from 'react-redux';
import { AppBar } from '../../app/AppBars/AppBar';
import { BottomNav } from '../../app/AppBars/BottomNav';
import { HelpButton } from '../../app/Buttons/HelpButton';
import { ProfilePictureButton } from '../../app/Buttons/ProfilePictureButton';
import { MainContainer } from '../../app/Containers/MainContainer';
import { SlideUpCSS } from '../../app/CSSTransitions/SlideUpCSS';
import { useHistory } from 'react-router-dom';
import { Body } from '../../app/Containers/Body';
import styles from './ChooseFoods.module.css';
import { DateDisplay, dateDisplayThemes } from './DateDisplay';
import { format, formatDistanceToNow } from 'date-fns';
import { Card, CardSectionDivider } from '../../app/Containers/Card/Card';
import {
  columnOptions,
  Gallery,
  GalleryItem,
} from '../../app/Containers/Gallery';
import classnames from 'classnames';
import { SummaryItem } from '../GiftShop/SummaryItem';
import {
  FoodTypeHeading,
  foodTypeHeadingTheme,
} from './Headings/FoodTypeHeading';
import { PackageHeading } from './Headings/PackageHeading';

export const OrderSummary = () => {
  const history = useHistory();

  const order = useSelector((state) => state.food.order);

  const deliveryDateInMillis = Date.parse(order.deliveryDate);

  const items = order.items;
  const totalItems = items.reduce((acc, item) => acc + item.count, 0);

  // Pick up to first three items to show pictures
  let previewImages = [];

  previewImages = items.slice(0, 3).map((item) => {
    return {
      image: item.image,
      name: item.name,
    };
  });

  //    We want to group the already grouped items into something resembling
  // {
  // type1: { items: [ {name, image, count}, {...}, ... ] }
  // type2: { items: [ {name, image, count}, {...}, ... ] }
  // }
  const groupedItemsByType = items.reduce((acc, food) => {
    acc[food.type] = acc[food.type] || {
      items: [],
      total: 0,
    };

    // Put the food item { name, image, count, ...} into the accumulator's items for the food's type
    acc[food.type].items.push(food);

    // Add the food.count to the food type's total count. e.g, add 2 meals if the food's type is 'meal' and food.count = 2
    acc[food.type].total += food.count;
    return acc;
  }, {});

  return (
    <>
      <AppBar
        left={
          <ProfilePictureButton
            image={useSelector((state) => state.meta.profilePic)}
            action={() => {
              history.push('/');
            }}
          />
        }
        right={<HelpButton />}
      />
      <MainContainer>
        <SlideUpCSS>
          <Body>
            {/* Order Status */}
            <div className={styles.order_status_container}>
              <DateDisplay
                date={order.deliveryDate}
                theme={dateDisplayThemes.grecianBlue}
              />
              <div className={styles.order_status_details}>
                <p>
                  {`Expect delivery 
                  ${formatDistanceToNow(deliveryDateInMillis, {
                    includeSeconds: true,
                    addSuffix: true,
                  })}`}
                </p>
                <p className={styles.date_time}>{`${format(
                  deliveryDateInMillis,
                  'E, MMM dd'
                )}`}</p>
              </div>
            </div>

            {/* Message about order */}
            <p className={styles.current_order_info}>We will deliver</p>

            {/* Start Current Order Package */}
            <Card>
              {/* Preview Pictures */}
              <div className={styles.pictures}>
                <Gallery>
                  {previewImages.map((obj, index) => (
                    <GalleryItem key={index}>
                      <img
                        className={styles.image}
                        src={obj.image}
                        alt={obj.name}
                      />
                    </GalleryItem>
                  ))}
                  {/* Tile showing amount of stuff */}
                  <GalleryItem>
                    <div
                      className={classnames(styles.package_size, styles.image)}
                    >
                      <p className={styles.package_size_count}>{totalItems}</p>
                      <p className={styles.package_size_unit}>foods</p>
                    </div>
                  </GalleryItem>
                </Gallery>
              </div>

              {order.label && (
                <div className={styles.package_details_wrapper}>
                  <PackageHeading
                    name={order.sponsoredByCoachName}
                    image={order.sponsoredByCoachImage}
                    packageLabel={order.label}
                  />
                </div>
              )}

              <CardSectionDivider />
              <div>
                {/* For each food type, e.g, meal, snack, etc */}
                {Object.keys(groupedItemsByType)
                  .sort()
                  .map((foodType, index) => (
                    <div key={index} className="col-xs-4 col-lg-4">
                      {/* Display a heading showing how many total of that type, e.g. 10 meals */}
                      <FoodTypeHeading
                        type={foodType}
                        count={groupedItemsByType[foodType].total}
                        theme={foodTypeHeadingTheme.plaster}
                      />

                      <Gallery>
                        {/* Show each food item */}
                        {groupedItemsByType[foodType].items.map(
                          (item, index) => (
                            <GalleryItem
                              key={index}
                              maxColumns={columnOptions.one}
                            >
                              <SummaryItem
                                id={item.id}
                                name={item.name}
                                image={item.image}
                                qty={item.count}
                              />
                            </GalleryItem>
                          )
                        )}
                      </Gallery>
                      <div
                        style={{ paddingTop: '1rem', paddingBottom: '1rem' }}
                      ></div>
                    </div>
                  ))}
              </div>
            </Card>
            {/* End Current Order Package */}

            <div style={{ height: '7rem' }}></div>
          </Body>
        </SlideUpCSS>
      </MainContainer>
      <BottomNav selected="food" />
    </>
  );
};
