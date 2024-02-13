import { useState } from "react";
import { activities } from "../utils/activities";
import TinderCard from "react-tinder-card";

const DisplayUser = ({ user, clickedUser, showActivity }) => {
  const [lastDirection, setLastDirection] = useState();
  const swiped = (direction, swipedUserId) => {
    if (direction === "right") {
      //updateMatches(swipedUserId);
    }

    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name, "left the screen!");
  };

  return (
    <>
      {!clickedUser && !showActivity && (
        <div className="userContainer">
          <div className="cardContainer">
            <TinderCard className="swipe" key={user.firstName}>
              <div
                className="card"
                style={{
                  backgroundImage: "url(" + user.url + ")",
                }}
              >
                <h3>{user.firstName}</h3>
              </div>
            </TinderCard>
          </div>
        </div>
      )}
      {clickedUser && !showActivity && (
        <div className="userContainer">
          <div className="cardContainer">
            <TinderCard className="swipe" key={clickedUser.firstName}>
              <div
                className="card"
                style={{
                  backgroundImage: "url(" + clickedUser.url + ")",
                }}
              >
                <h3>{clickedUser.firstName}</h3>
              </div>
            </TinderCard>
          </div>
        </div>
      )}
      {showActivity && (
        <div className="activityContainer">
          <div className="cardContainer">
            {activities?.map((activity) => (
              <TinderCard
                className="swipe"
                key={activity.name}
                onSwipe={(dir) => swiped(dir, activity.name)}
                onCardLeftScreen={() => outOfFrame(activity.firstName)}
              >
                <div
                  className="card"
                  style={{
                    backgroundImage: "url(" + activity.url + ")",
                  }}
                >
                  <h3>{activity.name}</h3>
                </div>
              </TinderCard>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default DisplayUser;
