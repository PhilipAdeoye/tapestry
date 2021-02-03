import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppBar } from "../../app/AppBars/AppBar";
import { BottomNav } from "../../app/AppBars/BottomNav";
import { HelpButton } from "../../app/Buttons/HelpButton";
import { ProfilePictureButton } from "../../app/Buttons/ProfilePictureButton";
import { MainContainer } from "../../app/Containers/MainContainer";
import { SlideUpCSS } from "../../app/CSSTransitions/SlideUpCSS";
import classnames from "classnames";
import styles from "./RewardHub.module.css";
import { ImageButton } from "../../app/Buttons/ImageButton";
import storefront from "../../images/giftshop_storefront.svg";
import trophies from "../../images/trophies.svg";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { updateLastVisitedRewardsHub } from "../Home/feedSlice";

export const RewardHub = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const pointsToSpend = useSelector((state) => state.rewards.points);
  const lifetimePoints = useSelector((state) => state.rewards.lifetimePoints);

  useEffect(() => {
    return () => {
      dispatch(updateLastVisitedRewardsHub());
    };
  }, [dispatch]);

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
          <div className={classnames("rubik", "container")}>
            <div className={styles.points_display}>
              <p className={styles.lead}>Points to Spend</p>
              <div className={styles.points_to_spend}>
                <p>{pointsToSpend.toLocaleString()}</p>
              </div>
              <p className={styles.lifetime_points}>
                Lifetime Points: <span>{lifetimePoints.toLocaleString()}</span>
              </p>
            </div>
            <div className={classnames("row", styles.menu_wrapper)}>
              <div
                className={classnames("col-xs-4", "col-lg-8", styles.menu_item)}
              >
                <ImageButton
                  img={storefront}
                  imgAlt="Store front"
                  title="Gift Shop"
                  subtitle="Spend points"
                  action={() => history.push("/giftshop")}
                />
              </div>
              {/* <div
                className={classnames("col-xs-4", "col-lg-4", styles.menu_item)}
              >
                <ImageButton
                  img={trophies}
                  imgAlt="Trophy with medal and stars"
                  title="Opportunities"
                  subtitle="Earn more points"
                  action={() => history.push("/opportunities")}
                />
              </div> */}
              {/* The following div acts as bottom padding so that the bottom nav doesn't block off any content that may be at the bottom */}
              <div className="col-xs-4" style={{ height: "8rem" }}></div>
            </div>
          </div>
        </SlideUpCSS>
      </MainContainer>
      <BottomNav selected="rewards" />
    </>
  );
};
