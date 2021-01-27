import React, { useState } from "react";
import { Route } from "react-router-dom";
import { dotTheme, ProgressDots } from "../../app/Misc/ProgressDots";
import { Tasks } from "./Tasks";
import { Welcome } from "./Welcome";
import { YourGoal } from "./YourGoal";
import foods from "../../images/foods_on_wb.png";
import purple_dumbbells from "../../images/purple_dumbbells.png";
import frying_pan from "../../images/frying_pan.jpg";
import fitness_trainer from "../../images/fitness_trainer.svg";
import team_cheer from "../../images/team_cheer.svg";
import stack_of_coins from "../../images/stack_of_coins.svg";
import parisian_storefront from "../../images/parisian_storefront.svg";
import we_deliver from "../../images/we_deliver.png";
import karouselStyles from "./Karousel.module.css";
import { KarouselBottomBar } from "./AppBars/KarouselBottomBar";
import { BackButton } from "./Buttons/BackButton";
import { NextButton } from "./Buttons/NextButton";
import { Rewards } from "./Rewards";
import { PlainContainer } from "./Containers/PlainContainer";
import { PatternContainer } from "./Containers/PatternContainer";
import { ChancesToEarn } from "./ChancesToEarn";
import { Completion } from "./Completion";
import { CSSTransition } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import {
  markAppOnboardingAsViewed,
  markFoodOnboardingAsViewed,
  markRewardsOnboardingAsViewed,
} from "../Shared/metaSlice";
import { addRewardItemToFeed } from "../Home/feedSlice";
import { addPoints, updateLifetimePoints } from "../Rewards/rewardsSlice";

export const Karousel = () => {
  const profileImage = useSelector((state) => state.meta.profilePic);
  const hiliCoachImage = useSelector((state) => state.meta.hiliCoachImage);
  const name = useSelector((state) => state.meta.userName);
  const hiliCoachName = useSelector((state) => state.meta.hiliCoachName);

  const dispatch = useDispatch();

  const completionRewardPoints = 50;

  // Backdrops
  const [rhombusBgIsVisible, setRhombusBgIsVisible] = useState(true);
  const [plainBgIsVisible, setPlainBgIsVisible] = useState(false);

  // New to app Onboarding
  const [welcomeIsVisible, setWelcomeIsVisible] = useState(true);
  const [yourGoalIsVisible, setYourGoalIsVisible] = useState(false);
  const [eatHealthyIsVisible, setEatHealthyIsVisible] = useState(false);
  const [workoutIsVisible, setWorkoutIsVisible] = useState(false);
  const [hiliCoachIsVisible, setHiliCoachIsVisible] = useState(false);
  const [cookingRewardsIsVisible, setCookingRewardsIsVisible] = useState(false);
  const [workoutRewardsIsVisible, setWorkoutRewardsIsVisible] = useState(false);
  const [cheerRewardsIsVisible, setCheerRewardsIsVisible] = useState(false);
  const [chancesToEarnIsVisible, setChancesToEarnIsVisible] = useState(false);
  const [completionIsVisible, setCompletionIsVisible] = useState(false);

  // Rewards Onboarding
  const [celebrateWinsIsVisible, setCelebrateWinsIsVisible] = useState(true);
  const [shopWithPointsIsVisible, setShopWithPointsIsVisible] = useState(false);

  // Foods Onboarding
  const [chooseMealsIsVisible, setChooseMealsIsVisible] = useState(true);
  const [weDeliverIsVisible, setWeDeliverIsVisible] = useState(false);

  // Callback when navigating from screen to screen
  const [onNextActionCallback, setOnNextActionCallback] = useState([]);

  return (
    <>
      {/* Start: New to app Onboarding */}
      <Route
        exact
        path="/onboarding/welcome"
        render={(routeProps) => (
          <Fade isVisible={rhombusBgIsVisible}>
            <PatternContainer>
              <Fade
                isVisible={welcomeIsVisible}
                onExitedAction={onNextActionCallback[0]}
              >
                <Welcome
                  {...routeProps}
                  image={profileImage}
                  name={name}
                  nextAction={() => {
                    dispatch(markAppOnboardingAsViewed());
                    setWelcomeIsVisible(false);
                    setOnNextActionCallback([
                      () => {
                        routeProps.history.push("/onboarding/your-goal");
                        setYourGoalIsVisible(true);
                        setWelcomeIsVisible(true);
                      },
                    ]);
                  }}
                />
              </Fade>
            </PatternContainer>
          </Fade>
        )}
      />

      <Route
        exact
        path="/onboarding/your-goal"
        render={(routeProps) => (
          <PatternContainer>
            <Fade
              isVisible={yourGoalIsVisible}
              onExitedAction={onNextActionCallback[0]}
            >
              <YourGoal
                {...routeProps}
                image={profileImage}
                name={name}
                progressDots={
                  <ProgressDots current={1} max={4} theme={dotTheme.deepBlue} />
                }
                nextAction={() => {
                  setYourGoalIsVisible(false);
                  setOnNextActionCallback([
                    () => {
                      routeProps.history.push("/onboarding/eat-healthy");
                      setEatHealthyIsVisible(true);
                      setYourGoalIsVisible(true);
                    },
                  ]);
                }}
              />
            </Fade>
          </PatternContainer>
        )}
      />
      <Route
        exact
        path="/onboarding/eat-healthy"
        render={(routeProps) => (
          <>
            <PatternContainer>
              <Fade
                isVisible={eatHealthyIsVisible}
                onExitedAction={onNextActionCallback[0]}
              >
                <Tasks
                  {...routeProps}
                  image={foods}
                  imgAlt="Fresh healthy foods: Avocado, ginger, brocolli, tomatoes, blueberries, oatmeal, almonds, etc"
                  text="Eat the low sodium foods we provide"
                  progressDots={
                    <ProgressDots
                      current={2}
                      max={4}
                      theme={dotTheme.deepBlue}
                    />
                  }
                />
              </Fade>
            </PatternContainer>
            <KarouselBottomBar
              left={
                <BackButton
                  action={() => {
                    setEatHealthyIsVisible(false);
                    setOnNextActionCallback([
                      () => {
                        routeProps.history.push("/onboarding/your-goal");
                        setYourGoalIsVisible(true);
                        setEatHealthyIsVisible(true);
                      },
                    ]);
                  }}
                />
              }
              right={
                <NextButton
                  action={() => {
                    setEatHealthyIsVisible(false);
                    setOnNextActionCallback([
                      () => {
                        routeProps.history.push("/onboarding/workout");
                        setWorkoutIsVisible(true);
                        setEatHealthyIsVisible(true);
                      },
                    ]);
                  }}
                />
              }
            />
          </>
        )}
      />
      <Route
        exact
        path="/onboarding/workout"
        render={(routeProps) => (
          <>
            <PatternContainer>
              <Fade
                isVisible={workoutIsVisible}
                onExitedAction={onNextActionCallback[0]}
              >
                <Tasks
                  {...routeProps}
                  image={purple_dumbbells}
                  imgAlt="Dumbbells"
                  text="Join us for the healthy activities"
                  progressDots={
                    <ProgressDots
                      current={3}
                      max={4}
                      theme={dotTheme.deepBlue}
                    />
                  }
                />
              </Fade>
            </PatternContainer>
            <KarouselBottomBar
              left={
                <BackButton
                  action={() => {
                    setWorkoutIsVisible(false);
                    setOnNextActionCallback([
                      () => {
                        routeProps.history.push("/onboarding/eat-healthy");
                        setEatHealthyIsVisible(true);
                        setWorkoutIsVisible(true);
                      },
                    ]);
                  }}
                />
              }
              right={
                <NextButton
                  action={() => {
                    setWorkoutIsVisible(false);
                    setOnNextActionCallback([
                      () => {
                        routeProps.history.push("/onboarding/hili-coach");
                        setHiliCoachIsVisible(true);
                        setWorkoutIsVisible(true);
                      },
                    ]);
                  }}
                />
              }
            />
          </>
        )}
      />
      <Route
        exact
        path="/onboarding/hili-coach"
        render={(routeProps) => (
          <>
            <Fade
              isVisible={rhombusBgIsVisible}
              animateAppear={false}
              animateEnter={false}
            >
              <PatternContainer>
                <Fade
                  isVisible={hiliCoachIsVisible}
                  onExitedAction={onNextActionCallback[0]}
                >
                  <Tasks
                    {...routeProps}
                    image={hiliCoachImage}
                    imgAlt={`Your HILI coach - ${hiliCoachName}`}
                    text={`Keep in touch with ${hiliCoachName}`}
                    progressDots={
                      <ProgressDots
                        current={4}
                        max={4}
                        theme={dotTheme.deepBlue}
                      />
                    }
                  />
                </Fade>
              </PatternContainer>
            </Fade>
            <KarouselBottomBar
              left={
                <BackButton
                  action={() => {
                    setHiliCoachIsVisible(false);
                    setOnNextActionCallback([
                      () => {
                        routeProps.history.push("/onboarding/workout");
                        setWorkoutIsVisible(true);
                        setHiliCoachIsVisible(true);
                      },
                    ]);
                  }}
                />
              }
              right={
                <NextButton
                  action={() => {
                    setHiliCoachIsVisible(false);

                    // Switch backgrounds
                    setRhombusBgIsVisible(false);
                    setPlainBgIsVisible(true);

                    // What happens after this screen transitions away
                    setOnNextActionCallback([
                      () => {
                        routeProps.history.push("/onboarding/cooking-rewards");
                        setCookingRewardsIsVisible(true);
                        setHiliCoachIsVisible(true);
                      },
                    ]);
                  }}
                />
              }
            />
          </>
        )}
      />
      <Route
        exact
        path="/onboarding/cooking-rewards"
        render={(routeProps) => (
          <>
            <Fade isVisible={plainBgIsVisible}>
              <PlainContainer>
                <Fade
                  isVisible={cookingRewardsIsVisible}
                  onExitedAction={onNextActionCallback[0]}
                >
                  <Rewards
                    {...routeProps}
                    title="Earn Points"
                    image={frying_pan}
                    imgAlt="Frying pan with veggies and meat"
                    text="by completing cooking class activities"
                    pointsReward="50"
                    progressDots={
                      <ProgressDots
                        current={1}
                        max={4}
                        theme={dotTheme.grecianBlue}
                      />
                    }
                  />
                </Fade>
              </PlainContainer>
            </Fade>
            <KarouselBottomBar
              left={
                <BackButton
                  action={() => {
                    setCookingRewardsIsVisible(false);

                    // Switch backgrounds
                    setRhombusBgIsVisible(true);
                    setPlainBgIsVisible(false);

                    setOnNextActionCallback([
                      () => {
                        routeProps.history.push("/onboarding/hili-coach");
                        setHiliCoachIsVisible(true);
                        setCookingRewardsIsVisible(true);
                      },
                    ]);
                  }}
                />
              }
              right={
                <NextButton
                  action={() => {
                    setCookingRewardsIsVisible(false);
                    setOnNextActionCallback([
                      () => {
                        routeProps.history.push("/onboarding/workout-rewards");
                        setWorkoutRewardsIsVisible(true);
                        setCookingRewardsIsVisible(true);
                      },
                    ]);
                  }}
                />
              }
            />
          </>
        )}
      />
      <Route
        exact
        path="/onboarding/workout-rewards"
        render={(routeProps) => (
          <>
            <PlainContainer>
              <Fade
                isVisible={workoutRewardsIsVisible}
                onExitedAction={onNextActionCallback[0]}
              >
                <Rewards
                  {...routeProps}
                  title="Earn Points"
                  image={fitness_trainer}
                  imgAlt="Fitness trainer coaching student"
                  text="by completing coach-led activities"
                  pointsReward="50"
                  progressDots={
                    <ProgressDots
                      current={2}
                      max={4}
                      theme={dotTheme.grecianBlue}
                    />
                  }
                />
              </Fade>
            </PlainContainer>
            <KarouselBottomBar
              left={
                <BackButton
                  action={() => {
                    setWorkoutRewardsIsVisible(false);
                    setOnNextActionCallback([
                      () => {
                        routeProps.history.push("/onboarding/cooking-rewards");
                        setCookingRewardsIsVisible(true);
                        setWorkoutRewardsIsVisible(true);
                      },
                    ]);
                  }}
                />
              }
              right={
                <NextButton
                  action={() => {
                    setWorkoutRewardsIsVisible(false);
                    setOnNextActionCallback([
                      () => {
                        routeProps.history.push("/onboarding/cheer-rewards");
                        setCheerRewardsIsVisible(true);
                        setWorkoutRewardsIsVisible(true);
                      },
                    ]);
                  }}
                />
              }
            />
          </>
        )}
      />
      <Route
        exact
        path="/onboarding/cheer-rewards"
        render={(routeProps) => (
          <>
            <PlainContainer>
              <Fade
                isVisible={cheerRewardsIsVisible}
                onExitedAction={onNextActionCallback[0]}
              >
                <Rewards
                  {...routeProps}
                  title="Earn Points"
                  image={team_cheer}
                  imgAlt="Happy emoji cheering"
                  text="Cheering your classmates"
                  pointsReward="50"
                  progressDots={
                    <ProgressDots
                      current={3}
                      max={4}
                      theme={dotTheme.grecianBlue}
                    />
                  }
                />
              </Fade>
            </PlainContainer>
            <KarouselBottomBar
              left={
                <BackButton
                  action={() => {
                    setCheerRewardsIsVisible(false);
                    setOnNextActionCallback([
                      () => {
                        routeProps.history.push("/onboarding/workout-rewards");
                        setWorkoutRewardsIsVisible(true);
                        setCheerRewardsIsVisible(true);
                      },
                    ]);
                  }}
                />
              }
              right={
                <NextButton
                  action={() => {
                    setCheerRewardsIsVisible(false);
                    setOnNextActionCallback([
                      () => {
                        routeProps.history.push("/onboarding/chances-to-earn");
                        setChancesToEarnIsVisible(true);
                        setCheerRewardsIsVisible(true);
                      },
                    ]);
                  }}
                />
              }
            />
          </>
        )}
      />
      <Route
        exact
        path="/onboarding/chances-to-earn"
        render={(routeProps) => (
          <>
            <PlainContainer>
              <Fade
                isVisible={chancesToEarnIsVisible}
                onExitedAction={onNextActionCallback[0]}
              >
                <ChancesToEarn
                  {...routeProps}
                  progressDots={
                    <ProgressDots
                      current={4}
                      max={4}
                      theme={dotTheme.grecianBlue}
                    />
                  }
                />
              </Fade>
            </PlainContainer>
            <Fade
              animateEnter={false}
              animateAppear={false}
              isVisible={chancesToEarnIsVisible}
            >
              <KarouselBottomBar
                left={
                  <BackButton
                    action={() => {
                      setChancesToEarnIsVisible(false);
                      setOnNextActionCallback([
                        () => {
                          routeProps.history.push("/onboarding/cheer-rewards");
                          setCheerRewardsIsVisible(true);
                          setChancesToEarnIsVisible(true);
                        },
                      ]);
                    }}
                  />
                }
                right={
                  <NextButton
                    action={() => {
                      setChancesToEarnIsVisible(false);
                      setOnNextActionCallback([
                        () => {
                          routeProps.history.push("/onboarding/completion");
                          setCompletionIsVisible(true);
                          setChancesToEarnIsVisible(true);
                        },
                      ]);
                    }}
                  />
                }
              />
            </Fade>
          </>
        )}
      />

      <Route
        exact
        path="/onboarding/completion"
        render={(routeProps) => (
          <Fade
            isVisible={plainBgIsVisible}
            animateAppear={false}
            animateEnter={false}
          >
            <PlainContainer>
              <Fade
                isVisible={completionIsVisible}
                onExitedAction={onNextActionCallback[0]}
              >
                <Completion
                  {...routeProps}
                  points={completionRewardPoints}
                  nextAction={() => {
                    setCompletionIsVisible(false);
                    setPlainBgIsVisible(false);
                    setOnNextActionCallback([
                      () => {
                        routeProps.history.push("/");
                        dispatch(
                          addRewardItemToFeed({
                            points: completionRewardPoints,
                            message: `You earned ${completionRewardPoints} points for getting started`,
                          })
                        );
                        dispatch(addPoints(50));
                        dispatch(updateLifetimePoints(50));
                        setCompletionIsVisible(true);
                      },
                    ]);
                  }}
                />
              </Fade>
            </PlainContainer>
          </Fade>
        )}
      />
      {/* End: New to app Onboarding */}

      {/* Start: Rewards Onboarding */}
      <Route
        exact
        path="/onboarding/celebrate-wins"
        render={(routeProps) => (
          <>
            <Fade isVisible={plainBgIsVisible}>
              <PlainContainer>
                <Fade
                  isVisible={celebrateWinsIsVisible}
                  onExitedAction={onNextActionCallback[0]}
                >
                  <Rewards
                    {...routeProps}
                    title="Celebrate Wins"
                    image={stack_of_coins}
                    imgAlt="A stack of gold coins"
                    text="See how many points you've earned. Find ways to earn more points"
                    progressDots={
                      <ProgressDots
                        current={1}
                        max={2}
                        theme={dotTheme.grecianBlue}
                      />
                    }
                  />
                </Fade>
              </PlainContainer>
            </Fade>
            <KarouselBottomBar
              right={
                <NextButton
                  action={() => {
                    dispatch(markRewardsOnboardingAsViewed());
                    setCelebrateWinsIsVisible(false);
                    setOnNextActionCallback([
                      () => {
                        routeProps.history.push("/onboarding/shop-with-points");
                        setShopWithPointsIsVisible(true);
                        setCelebrateWinsIsVisible(true);
                      },
                    ]);
                  }}
                />
              }
            />
          </>
        )}
      />
      <Route
        exact
        path="/onboarding/shop-with-points"
        render={(routeProps) => (
          <>
            <PlainContainer>
              <Fade
                isVisible={shopWithPointsIsVisible}
                onExitedAction={onNextActionCallback[0]}
              >
                <Rewards
                  {...routeProps}
                  title="Shop with Points"
                  image={parisian_storefront}
                  imgAlt="A cute store front with a vespa-style scooter in front"
                  text="Redeem points for items in the Gift Shop"
                  progressDots={
                    <ProgressDots
                      current={1}
                      max={2}
                      theme={dotTheme.grecianBlue}
                    />
                  }
                />
              </Fade>
            </PlainContainer>
            <KarouselBottomBar
              left={
                <BackButton
                  action={() => {
                    setShopWithPointsIsVisible(false);
                    setOnNextActionCallback([
                      () => {
                        routeProps.history.push("/onboarding/celebrate-wins");
                        setCelebrateWinsIsVisible(true);
                        setShopWithPointsIsVisible(true);
                      },
                    ]);
                  }}
                />
              }
              right={
                <NextButton
                  alternateLabel="START"
                  action={() => {
                    setShopWithPointsIsVisible(false);
                    setOnNextActionCallback([
                      () => {
                        routeProps.history.push("/rewards");
                        setCelebrateWinsIsVisible(true);
                        setShopWithPointsIsVisible(true);
                      },
                    ]);
                  }}
                />
              }
            />
          </>
        )}
      />
      {/* End: Rewards Onboarding */}

      {/* Start: Food Onboarding */}
      <Route
        exact
        path="/onboarding/choose-meals"
        render={(routeProps) => (
          <>
            <Fade isVisible={plainBgIsVisible}>
              <PlainContainer>
                <Fade
                  isVisible={chooseMealsIsVisible}
                  onExitedAction={onNextActionCallback[0]}
                >
                  <Rewards
                    {...routeProps}
                    title="Choose Meals"
                    image={parisian_storefront}
                    imgAlt="A cute store front with a vespa-style scooter in front"
                    text="Choose meals and snacks before your order due date"
                    progressDots={
                      <ProgressDots
                        current={1}
                        max={2}
                        theme={dotTheme.grecianBlue}
                      />
                    }
                  />
                </Fade>
              </PlainContainer>
            </Fade>
            <KarouselBottomBar
              right={
                <NextButton
                  action={() => {
                    dispatch(markFoodOnboardingAsViewed());
                    setChooseMealsIsVisible(false);
                    setOnNextActionCallback([
                      () => {
                        routeProps.history.push("/onboarding/we-deliver");
                        setWeDeliverIsVisible(true);
                        setChooseMealsIsVisible(true);
                      },
                    ]);
                  }}
                />
              }
            />
          </>
        )}
      />
      <Route
        exact
        path="/onboarding/we-deliver"
        render={(routeProps) => (
          <>
            <PlainContainer>
              <Fade
                isVisible={weDeliverIsVisible}
                onExitedAction={onNextActionCallback[0]}
              >
                <Rewards
                  {...routeProps}
                  title="We Deliver"
                  image={we_deliver}
                  imgAlt="A delivery van with a driver"
                  text="We will deliver your meals and snacks a few days later"
                  progressDots={
                    <ProgressDots
                      current={2}
                      max={2}
                      theme={dotTheme.grecianBlue}
                    />
                  }
                />
              </Fade>
            </PlainContainer>
            <KarouselBottomBar
              left={
                <BackButton
                  action={() => {
                    setWeDeliverIsVisible(false);
                    setOnNextActionCallback([
                      () => {
                        routeProps.history.push("/onboarding/choose-meals");
                        setChooseMealsIsVisible(true);
                        setWeDeliverIsVisible(true);
                      },
                    ]);
                  }}
                />
              }
              right={
                <NextButton
                  alternateLabel="START"
                  action={() => {
                    setWeDeliverIsVisible(false);
                    setOnNextActionCallback([
                      () => {
                        routeProps.history.push("/food");
                        setWeDeliverIsVisible(true);
                        setWeDeliverIsVisible(true);
                      },
                    ]);
                  }}
                />
              }
            />
          </>
        )}
      />
      {/* End: Food Onboarding */}
    </>
  );
};

const Fade = ({
  children,
  isVisible,
  onExitedAction,
  animateAppear = true,
  animateEnter = true,
  animateExit = true,
}) => {
  return (
    <CSSTransition
      in={isVisible}
      appear={animateAppear}
      enter={animateEnter}
      exit={animateExit}
      timeout={{ enter: 200, exit: 400 }}
      classNames={{ ...karouselStyles }}
      onExited={() => {
        if (onExitedAction && typeof onExitedAction === "function") {
          onExitedAction();
        }
      }}
    >
      {children}
    </CSSTransition>
  );
};
