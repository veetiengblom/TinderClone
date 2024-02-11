import { activities } from "../utils/activities";
import TinderCard from "react-tinder-card";
import { useState } from "react";

const UserProfile = () => {
  const [showActivity, setShowActivity] = useState(true);
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
    <div className="userProfile">
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
    </div>
  );
};

export default UserProfile;
