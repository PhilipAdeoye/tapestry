import React from "react";
import { useSelector } from "react-redux";
import { AppBar } from "../../app/AppBars/AppBar";
import { BottomNav } from "../../app/AppBars/BottomNav";
import { HelpButton } from "../../app/Buttons/HelpButton";
import { ProfilePictureButton } from "../../app/Buttons/ProfilePictureButton";
import { MainContainer } from "../../app/Containers/MainContainer";
import { SlideUpCSS } from "../../app/CSSTransitions/SlideUpCSS";
import { BigIconWithText } from "../../app/Headings/BigIconWithText";
import happiness from "../../images/happiness.svg";
import styles from "./CareTeam.module.css";
import { Card, CardImage } from "../../app/Containers/Card/Card";
import { useHistory } from "react-router-dom";
import { Body } from "../../app/Containers/Body";

export const CareTeam = () => {
  const history = useHistory();
  const teamMembers = useSelector((state) => state.careTeam.teamMembers);

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
            <div style={{ paddingLeft: "1rem" }}>
              <BigIconWithText
                image={happiness}
                text="Care Team"
                imgAlt="Friends"
              />
            </div>
            <div className="row">
              {teamMembers.length &&
                teamMembers.map((m, index) => (
                  <TeamMember
                    key={index}
                    id={m.id}
                    name={m.name}
                    role={m.role}
                    image={m.image}
                  />
                ))}
              {/* The following div acts as bottom padding so that the bottom nav doesn't block off any content that may be at the bottom */}
              <div className="col-xs-4" style={{ height: "8rem" }}></div>
            </div>
          </Body>
        </SlideUpCSS>
      </MainContainer>
      <BottomNav selected="folks" />
    </>
  );
};

const TeamMember = ({ id, image, name, role }) => {
  return (
    <div className="col-xs-4 col-lg-4" style={{ marginBottom: "1rem" }}>
      <Card>
        <div className={styles.details}>
          <CardImage src={image} alt={name} />
          <div className={styles.texts}>
            <p className={styles.name}>{name}</p>
            <p className={styles.role}>{role}</p>
          </div>
        </div>
        {/* <CardActionButtonGroup
          items={[
            {
              text: 'Say Hi',
              icon: <RiThumbUpLine />,
            },
            {
              text: 'Message',
              icon: <BiComment />,
            },
          ]}
        /> */}
      </Card>
    </div>
  );
};
