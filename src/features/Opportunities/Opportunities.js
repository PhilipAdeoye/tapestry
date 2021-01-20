import React from 'react';
import { useSelector } from 'react-redux';
import { AppBar } from '../../app/AppBars/AppBar';
import { BottomNav } from '../../app/AppBars/BottomNav';
import { HelpButton } from '../../app/Buttons/HelpButton';
import { MainContainer } from '../../app/Containers/MainContainer';
import { SlideUpCSS } from '../../app/CSSTransitions/SlideUpCSS';
import { useHistory } from 'react-router-dom';
import {
  iconPosition,
  buttonKind,
  IconTextButton,
} from '../../app/Buttons/IconTextButton';
import { MdChevronLeft } from 'react-icons/md';
import { BigIconWithText } from '../../app/Headings/BigIconWithText';
import trophies from '../../images/trophies.svg';
import food_basket from '../../images/food_basket.svg';
import calendar_check from '../../images/calendar_check.svg';
import pointing_fingers from '../../images/pointing_fingers.svg';
import purple_thumbs from '../../images/purple_thumbs.svg';
import fruits from '../../images/fruits.svg';
import { PointsCategoryItem } from './PointsCategoryItem';
import { Gallery, GalleryItem } from '../../app/Containers/Gallery';
import { Body } from '../../app/Containers/Body';

export const Opportunities = () => {
  const history = useHistory();

  return (
    <>
      <AppBar
        left={
          <IconTextButton
            icon={<MdChevronLeft />}
            label="BACK"
            position={iconPosition.left}
            kind={buttonKind.primary}
            action={() => {
              history.push('/rewards');
            }}
          />
        }
        right={<HelpButton />}
      />
      <MainContainer>
        <SlideUpCSS>
          <Body>
            <BigIconWithText
              image={trophies}
              imgAlt="Trophy with medal and stars"
              text="Opportunities"
            />
            <Gallery>
              <GalleryItem>
                <PointsCategoryItem
                  name="Food Orders"
                  description={`Earn points for picking food orders for delivery. Each time you pick, you earn 10 points. You can earn up to 20 times`}
                  image={food_basket}
                  imgAlt="A wicker basket containing carrots and greens"
                  currentVal={useSelector(
                    (state) => state.rewards.foodOrderOppos.currentVal
                  )}
                  max={useSelector((state) => state.rewards.foodOrderOppos.max)}
                />
              </GalleryItem>
              <GalleryItem>
                <PointsCategoryItem
                  name="Event RSVPs"
                  description={`Earn points for letting us know if you plan to attend events. Each event you RSVP and attend earns 50 points. You can earn up to 60 times`}
                  image={calendar_check}
                  imgAlt="A calendar with a check mark"
                  currentVal={useSelector(
                    (state) => state.rewards.eventRSVPOppos.currentVal
                  )}
                  max={useSelector((state) => state.rewards.eventRSVPOppos.max)}
                />
              </GalleryItem>
              <GalleryItem>
                <PointsCategoryItem
                  name="Activity Participation"
                  description={`Earn points for participating in team activities`}
                  image={pointing_fingers}
                  imgAlt="Four fingers pointing at each other"
                  currentVal={useSelector(
                    (state) => state.rewards.participationOppos.currentVal
                  )}
                  max={useSelector(
                    (state) => state.rewards.participationOppos.max
                  )}
                />
              </GalleryItem>
              <GalleryItem>
                <PointsCategoryItem
                  name="Social Interaction"
                  description={`Earn points for interacting with team members.`}
                  image={purple_thumbs}
                  imgAlt="Thumbs up"
                  currentVal={useSelector(
                    (state) => state.rewards.socialOppos.currentVal
                  )}
                  max={useSelector((state) => state.rewards.socialOppos.max)}
                />
              </GalleryItem>
              <GalleryItem>
                <PointsCategoryItem
                  name="Food Order Variety"
                  description={`Earn points for adding variety to your meal orders. Each different meal order earns you 30 points. You can earn this up to 6 times`}
                  image={fruits}
                  imgAlt="A plate of assorted fruits containing an orange, a slice of watermelon, and grapes"
                  currentVal={useSelector(
                    (state) => state.rewards.foodVarietyOppos.currentVal
                  )}
                  max={useSelector(
                    (state) => state.rewards.foodVarietyOppos.max
                  )}
                />
              </GalleryItem>
            </Gallery>
            <div style={{ height: '6rem' }}></div>
          </Body>
        </SlideUpCSS>
      </MainContainer>
      <BottomNav selected="rewards" />
    </>
  );
};
