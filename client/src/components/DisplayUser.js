import { activities } from "../utils/activities";
import { useState } from "react";

import TinderCard from "react-tinder-card";

const DisplayUser = ({ user, showActivity, setShowActivity }) => {
  const [lastDirection, setLastDirection] = useState();
  const swiped = (direction, swipedUserId) => {
    if (direction === "right") {
    }

    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name, "left the screen!");
  };
  return (
    <>
      {showActivity && (
        <div className="activityContainer">
          <div className="cardContainer">
            {activities?.map((activity) => (
              <TinderCard
                className="swipe"
                key={activity.name}
                onSwipe={(dir) => swiped(dir, activity.name)}
                onCardLeftScreen={() => outOfFrame(activity.name)}
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
      {!showActivity && (
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
    </>
  );
};

export default DisplayUser;
