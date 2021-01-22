import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { AppBar } from "../../app/AppBars/AppBar";
import { BackButton } from "../../app/Buttons/BackButton";
import { HelpButton } from "../../app/Buttons/HelpButton";
import { MainContainer } from "../../app/Containers/MainContainer";
import { SlideUpCSS } from "../../app/CSSTransitions/SlideUpCSS";
import { BigIconWithText } from "../../app/Headings/BigIconWithText";
import clipboard from "../../images/clipboard.svg";
import { Body } from "../../app/Containers/Body";
import { useDispatch, useSelector } from "react-redux";
import BottomSheet from "../../app/Containers/BottomSheet";
import {
  columnOptions,
  Gallery,
  GalleryItem,
} from "../../app/Containers/Gallery";
import { Card } from "../../app/Containers/Card/Card";
import { stuffBallotBoxWithCurrentPackage } from "../Food/foodSlice";
import { Item } from "./Item";
import { FoodTypeHeading } from "../Food/Headings/FoodTypeHeading";
import { StatusBar } from "../../app/AppBars/StatusBar";
import { OutlinedButton } from "../../app/Buttons/OutlinedButton";
import { MdArrowForward } from "react-icons/md";
import { showModal } from "../Modal/modalSlice";
import { SelectionConfirmation } from "../Food/SelectionConfirmation";

export const BallotBox = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  let ballotItems = useSelector((state) => state.food.ballotBox.items);
  if (ballotItems.length === 0) {
    dispatch(stuffBallotBoxWithCurrentPackage());
  }
  ballotItems = useSelector((state) => state.food.ballotBox.items);

  //    We want to group the already grouped items into something resembling
  // {
  // type1: { items: [ {name, image, count}, {...}, ... ] }
  // type2: { items: [ {name, image, count}, {...}, ... ] }
  // }
  const groupedItemsByType = ballotItems.reduce((acc, food) => {
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
        left={<BackButton action={() => history.push("/food")} />}
        right={<HelpButton />}
      />
      <MainContainer>
        <SlideUpCSS>
          <Body>
            <BigIconWithText
              image={clipboard}
              imgAlt="Clipboard with a check mark"
              text="Pick Foods"
            />

            <BottomSheet>
              {/* For each food type, e.g, meal, snack, etc */}
              {Object.keys(groupedItemsByType)
                .sort()
                .map((foodType, index) => (
                  <div key={index} style={{ paddingBottom: "1rem" }}>
                    <FoodTypeHeading
                      type={foodType}
                      count={groupedItemsByType[foodType].total}
                      showCount={false}
                    />

                    <Gallery>
                      {groupedItemsByType[foodType].items
                        .sort((a, b) => a.id - b.id)
                        .map((item, index) => (
                          <GalleryItem
                            key={index}
                            maxColumns={columnOptions.two}
                          >
                            <Card>
                              <Item
                                name={item.name}
                                image={item.image}
                                qty={item.count}
                                itemId={item.id}
                                approved={item.approved}
                              />
                            </Card>
                          </GalleryItem>
                        ))}
                    </Gallery>
                  </div>
                ))}
            </BottomSheet>
          </Body>
        </SlideUpCSS>
      </MainContainer>
      <StatusBar>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexGrow: "1",
            justifyContent: "flex-end",
          }}
        >
          <OutlinedButton
            text="Done"
            icon={<MdArrowForward />}
            action={() => {
              history.push("/food");
              dispatch(showModal({ content: <SelectionConfirmation /> }));
            }}
          />
        </div>
      </StatusBar>
    </>
  );
};
