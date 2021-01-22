import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppBar } from "../../app/AppBars/AppBar";
import { BottomNav } from "../../app/AppBars/BottomNav";
import { HelpButton } from "../../app/Buttons/HelpButton";
import { CardDisclosureActionButtonGroup } from "../../app/Buttons/CardDisclosureActionButtonGroup";
import { ProfilePictureButton } from "../../app/Buttons/ProfilePictureButton";
import { MainContainer } from "../../app/Containers/MainContainer";
import { SlideUpCSS } from "../../app/CSSTransitions/SlideUpCSS";
import { useHistory } from "react-router-dom";
import { Body } from "../../app/Containers/Body";
import styles from "./ChooseFoods.module.css";
import { DateDisplay } from "./DateDisplay";
import { format, formatDistanceToNow } from "date-fns";
import { numberAsCardinalWord } from "../../utils";
import { Card } from "../../app/Containers/Card/Card";
import { CardInfo } from "../../app/Containers/Card/CardInfo";
import {
  MdCheck,
  MdFastForward,
  MdModeEdit,
  MdRemoveRedEye,
  MdReplay,
} from "react-icons/md";
import { Gallery, GalleryItem } from "../../app/Containers/Gallery";
import classnames from "classnames";

import {
  placeOrderWithBallotBox,
  placeOrderWithPackage,
  placeOrderWithCart,
  resetCart,
  resetBallotBox,
  // skipOrder,
  cancelSkip,
} from "../Food/foodSlice";
import { PackageHeading } from "./Headings/PackageHeading";
import { addRewardItemToFeed } from "../Home/feedSlice";
import { addPoints, updateLifetimePoints } from "../Rewards/rewardsSlice";
import { hideModal, showModal } from "../Modal/modalSlice";
import { Confirm } from "../Shared/Confirm";

export const ChooseFoods = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const isSkippingOrder = useSelector((state) => state.food.isSkippingOrder);

  const currentOrderSequence = useSelector(
    (state) => state.food.currentOrderSequence
  );
  const hiliCoachName = useSelector((state) => state.meta.hiliCoachName);

  const packageDetails = useSelector((state) => {
    return {
      id: state.food.package.id,
      label: state.food.package.label,
      sponsoredByCoachName: state.food.package.sponsoredByCoachName,
      sponsoredByCoachImage: state.food.package.sponsoredByCoachImage,
    };
  });

  const items = useSelector((state) => state.food.package.items);
  const totalItems = items.reduce((acc, item) => acc + item.count, 0);

  // Use the cart to determine the current cart size
  const cartItems = useSelector((state) => state.food.cart.items);
  const currentCartSize = cartItems.reduce((acc, item) => acc + item.count, 0);

  const cartIsFull = currentCartSize === totalItems;
  const cartIsEmpty = currentCartSize === 0;
  const cartHasSomeItems = !cartIsFull && currentCartSize > 0;

  const ballotBoxItems = useSelector((state) => state.food.ballotBox.items);
  const userHasApprovedItems = ballotBoxItems.length > 0;

  // Alternate method of expressing preferences
  const shouldUseCart = useSelector((state) => state.meta.shouldUseFoodCart);

  // Pick up to first three items to show pictures
  let previewImages = [];
  if (cartIsFull && shouldUseCart) {
    previewImages = cartItems
      .filter((x) => x.count)
      .slice(0, 3)
      .map((item) => {
        return {
          image: item.image,
          name: item.name,
        };
      });
  } else if (userHasApprovedItems && !shouldUseCart) {
    previewImages = ballotBoxItems
      .filter((x) => x.approved)
      .slice(0, 3)
      .map((item) => {
        return {
          image: item.image,
          name: item.name,
        };
      });
  } else {
    previewImages = items.slice(0, 3).map((item) => {
      return {
        image: item.image,
        name: item.name,
      };
    });
  }

  const resetCartAction = {
    icon: <MdReplay />,
    text: `Reset`,
    hideDisclosureIcon: true,
    action: () => {
      dispatch(resetCart());
    },
  };

  const viewPackage = {
    icon: <MdRemoveRedEye />,
    text: cartIsFull ? `See ${hiliCoachName}'s picks` : "See what's inside",
    action: () => {
      history.push("/food/view-package");
    },
  };

  const editCart = {
    icon: <MdModeEdit />,
    text:
      (cartIsEmpty && "Customize") ||
      (cartIsFull && "Change your picks") ||
      (cartHasSomeItems && `Pick ${totalItems - currentCartSize} more items`),
    isHighlighted: cartHasSomeItems,
    action: () => {
      history.push("/food/cart");
    },
  };

  const vote = {
    icon: <MdModeEdit />,
    text: "Customize",
    action: () => {
      history.push("/food/ballot-box");
    },
  };

  const resetBallotBoxAction = {
    icon: <MdReplay />,
    text: `Reset`,
    hideDisclosureIcon: true,
    action: () => {
      dispatch(resetBallotBox());
    },
  };

  // const skipThisOrder = {
  //   icon: <MdFastForward />,
  //   text: 'Skip this order',
  //   action: () => {
  //     dispatch(skipOrder());
  //   },
  // };

  const cancelTheSkip = {
    icon: <MdReplay />,
    text: "Cancel Skip",
    hideDisclosureIcon: true,
    action: () => {
      dispatch(cancelSkip());
    },
  };

  const placeBallotBoxOrder = {
    icon: <MdCheck />,
    text: "Place order",
    action: () => {
      dispatch(
        showModal({
          content: (
            <Confirm
              title="Just a sec"
              bodyContent={`After you press CONTINUE to place your order, you will not be able to make any changes`}
              confirmButtonText="CONTINUE"
              action={() => {
                dispatch(placeOrderWithBallotBox());
                rewardPlacingOrder();
                history.push("/food/order-summary");
                dispatch(hideModal());
              }}
            />
          ),
        })
      );
    },
  };

  const placePackageOrder = {
    icon: <MdCheck />,
    text: "Place order",
    action: () => {
      dispatch(
        showModal({
          content: (
            <Confirm
              title="Just a sec"
              bodyContent={`After you press CONTINUE to place your order, you will not be able to make any changes`}
              confirmButtonText="CONTINUE"
              action={() => {
                dispatch(placeOrderWithPackage());
                rewardPlacingOrder();
                history.push("/food/order-summary");
                dispatch(hideModal());
              }}
            />
          ),
        })
      );
    },
  };

  const placeCartOrder = {
    icon: <MdCheck />,
    text: "Place order",
    action: () => {
      dispatch(
        showModal({
          content: (
            <Confirm
              title="Just a sec"
              bodyContent={`After you press CONTINUE to place your order, you will not be able to make any changes`}
              confirmButtonText="CONTINUE"
              action={() => {
                dispatch(placeOrderWithCart());
                rewardPlacingOrder();
                history.push("/food/order-summary");
                dispatch(hideModal());
              }}
            />
          ),
        })
      );
    },
  };

  // Every good deed gets rewarded
  const rewardPlacingOrder = () => {
    dispatch(
      addRewardItemToFeed({
        points: 40,
        message: `Fine choices! Here's some coin to hold you over until your package arrives`,
      })
    );
    dispatch(addPoints(40));
    dispatch(updateLifetimePoints(40));
  };

  // Order actions when using the cart
  const emptyCartActions = [viewPackage, editCart, placePackageOrder];
  const incompleteCartActions = [viewPackage, editCart, resetCartAction];
  const fullCartActions = [
    editCart,
    viewPackage,
    resetCartAction,
    placeCartOrder,
  ];

  let orderActionItems = [];
  if (shouldUseCart) {
    orderActionItems =
      (cartIsEmpty && emptyCartActions) ||
      (cartHasSomeItems && incompleteCartActions) ||
      (cartIsFull && fullCartActions);
  } else {
    orderActionItems =
      (userHasApprovedItems && [
        viewPackage,
        vote,
        resetBallotBoxAction,
        placeBallotBoxOrder,
      ]) ||
      (!userHasApprovedItems && [viewPackage, vote, placePackageOrder]);
  }

  return (
    <>
      <AppBar
        left={
          <ProfilePictureButton
            image={useSelector((state) => state.meta.profilePic)}
            action={() => {
              history.push("/");
            }}
          />
        }
        right={<HelpButton />}
      />
      <MainContainer>
        <SlideUpCSS>
          <Body>
            {/* Order Status */}
            <OrderStatus
              cartIsFull={cartIsFull}
              userHasApprovedItems={userHasApprovedItems}
            />

            {/* Message about order */}
            {!(cartIsFull || userHasApprovedItems || isSkippingOrder) && (
              <p
                className={styles.current_order_info}
              >{`For your ${numberAsCardinalWord(
                currentOrderSequence
              )} order, ${hiliCoachName} picked out`}</p>
            )}

            {isSkippingOrder ? (
              <Card>
                <div style={{ paddingBottom: "0.75rem" }}>
                  <CardInfo
                    text="Skipping this order"
                    icon={<MdFastForward />}
                  />
                </div>
                <CardDisclosureActionButtonGroup items={[cancelTheSkip]} />
              </Card>
            ) : (
              <Card>
                <PicturePreview
                  previewImages={previewImages}
                  totalItems={totalItems}
                />

                {/* Package Details */}
                {!cartIsFull && (
                  <div className={styles.package_details_wrapper}>
                    <PackageHeading
                      name={packageDetails.sponsoredByCoachName}
                      image={packageDetails.sponsoredByCoachImage}
                      packageLabel={packageDetails.label}
                    />
                  </div>
                )}

                {/* Available Actions */}
                <CardDisclosureActionButtonGroup items={orderActionItems} />
              </Card>
            )}

            <div style={{ height: "7rem" }}></div>
          </Body>
        </SlideUpCSS>
      </MainContainer>
      <BottomNav selected="food" />
    </>
  );
};

const PicturePreview = ({ previewImages, totalItems }) => {
  return (
    <div className={styles.pictures}>
      <Gallery>
        {previewImages.map((obj, index) => (
          <GalleryItem key={index}>
            <img className={styles.image} src={obj.image} alt={obj.name} />
          </GalleryItem>
        ))}
        {/* Tile showing amount of stuff */}
        <GalleryItem>
          <div className={classnames(styles.package_size, styles.image)}>
            <p className={styles.package_size_count}>{totalItems}</p>
            <p className={styles.package_size_unit}>foods</p>
          </div>
        </GalleryItem>
      </Gallery>
    </div>
  );
};

const OrderStatus = ({ cartIsFull, userHasApprovedItems }) => {
  const orderWillBePlacedOnDate = useSelector(
    (state) => state.food.orderWillBePlacedOn
  );
  const orderTime = useSelector((state) => state.food.orderTime);
  const orderDateTimeInMillis = Date.parse(
    orderWillBePlacedOnDate + " " + orderTime
  );

  const deliveryDateInMillis = Date.parse(
    useSelector((state) => state.food.itemsWillBeDeliveredOn)
  );

  return (
    <div className={styles.order_status_container}>
      <DateDisplay date={orderWillBePlacedOnDate} />
      <div className={styles.order_status_details}>
        {cartIsFull || userHasApprovedItems ? (
          <>
            <p className="fz28 medium">Order Complete</p>
            <p>
              Delivery on{" "}
              <span className="medium">
                {format(deliveryDateInMillis, "E, MMM dd")}
              </span>
            </p>
          </>
        ) : (
          <>
            <p>
              {`Order is due 
                  ${formatDistanceToNow(orderDateTimeInMillis, {
                    includeSeconds: true,
                    addSuffix: true,
                  })}`}
            </p>
            <p className={styles.date_time}>{`${format(
              orderDateTimeInMillis,
              "E, MMM dd"
            )} at ${format(orderDateTimeInMillis, "h:mm a")}`}</p>
          </>
        )}
      </div>
    </div>
  );
};
