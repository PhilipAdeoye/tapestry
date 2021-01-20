import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppBar } from '../../app/AppBars/AppBar';
import { BottomNav } from '../../app/AppBars/BottomNav';
import { BackButton } from '../../app/Buttons/BackButton';
import { HelpButton } from '../../app/Buttons/HelpButton';
import { Body } from '../../app/Containers/Body';
import BottomSheet from '../../app/Containers/BottomSheet';
import {
  columnOptions,
  Gallery,
  GalleryItem,
} from '../../app/Containers/Gallery';
import { MainContainer } from '../../app/Containers/MainContainer';
import { SlideUpCSS } from '../../app/CSSTransitions/SlideUpCSS';
import { SectionDivider } from '../../app/Misc/SectionDivider';
import { SummaryItem } from '../GiftShop/SummaryItem';
import { FoodTypeHeading } from './Headings/FoodTypeHeading';
import { PackageHeading } from './Headings/PackageHeading';
import styles from './PackageView.module.css';

export const PackageView = () => {
  const history = useHistory();

  const items = useSelector((state) => state.food.package.items);

  const packageDetails = useSelector((state) => {
    return {
      id: state.food.package.id,
      label: state.food.package.label,
      sponsoredByCoachName: state.food.package.sponsoredByCoachName,
      sponsoredByCoachImage: state.food.package.sponsoredByCoachImage,
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
        left={<BackButton action={() => history.push('/food')} />}
        right={<HelpButton />}
      />
      <MainContainer>
        <SlideUpCSS>
          <Body>
            {/* Display the package heading: Package name, sponsor picture, etc */}
            <div className={styles.package_heading_wrapper}>
              <PackageHeading
                name={packageDetails.sponsoredByCoachName}
                image={packageDetails.sponsoredByCoachImage}
                packageLabel={packageDetails.label}
              />
            </div>

            <BottomSheet>
              <div className="row">
                {/* For each food type, e.g, meal, snack, etc */}
                {Object.keys(groupedItemsByType)
                  .sort()
                  .map((foodType, index) => (
                    <div key={index} className="col-xs-4 col-lg-4">
                      {/* Display a heading showing how many total of that type, e.g. 10 meals */}
                      <FoodTypeHeading
                        type={foodType}
                        count={groupedItemsByType[foodType].total}
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
                        style={{ paddingTop: '1rem', paddingBottom: '2rem' }}
                      >
                        <SectionDivider />
                      </div>
                    </div>
                  ))}
              </div>
            </BottomSheet>
          </Body>
        </SlideUpCSS>
      </MainContainer>
      <BottomNav selected="food" />
    </>
  );
};
