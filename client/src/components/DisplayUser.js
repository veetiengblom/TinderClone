import { useState } from "react";
import { activities } from "../utils/activities";
import TinderCard from "react-tinder-card";

const DisplayUser = ({ user, clickedUser, showActivity }) => {
  const [lastDirection, setLastDirection] = useState();

  const updateActivities = async (userId, swipedActivity, clickedUserId) => {
    try {
      const response = await fetch("/index/addActivity", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ userId, swipedActivity, clickedUserId }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const swiped = (direction, swipedActivity) => {
    if (direction === "right") {
      updateActivities(user.userId, swipedActivity, clickedUser.userId);
    }

    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name, "left the screen!");
  };
  const userActivities = user.activities;
  const clickedUserActivities = clickedUser?.activities;

  const matchedActivities = userActivities?.filter((x) =>
    clickedUserActivities?.includes(x)
  );

  const filteredActivities = activities.filter((x) =>
    matchedActivities.includes(x.name)
  );

  console.log(filteredActivities);

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
          <h3>{clickedUser.about}</h3>
        </div>
      )}
      {showActivity && (
        <div className="activityContainer">
          <div className="cardContainer">
            {filteredActivities?.map((activity) => (
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
    </>
  );
};

export default DisplayUser;
