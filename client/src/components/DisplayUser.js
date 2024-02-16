import { useState } from "react";
import TinderCard from "react-tinder-card";

const DisplayUser = ({
  user,
  clickedUser,
  showActivity,
  setDisplayActivity,
}) => {
  const [lastDirection, setLastDirection] = useState();
  const [activities, setActivities] = useState();

  const userActivities = user.activities;
  const clickedUserActivities = clickedUser?.activities;
  const matchedActivities = userActivities?.filter((x) =>
    clickedUserActivities?.includes(x)
  );

  const getActivities = async () => {
    try {
      const response = await fetch("/index/getActivities", {
        method: "GET",
        headers: {
          params: JSON.stringify(matchedActivities),
        },
      });

      const data = await response.json();

      setActivities(data.existingUser);
    } catch (error) {
      console.log(error);
    }
  };

  const updateActivities = async (userId, swipedActivity, clickedUserId) => {
    try {
      const response = await fetch("/index/addActivity", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ userId, clickedUserId, swipedActivity }),
      });
      const data = await response.json();
      console.log(data.activities);
      const lastActivity = data.activities.slice(-1);
      const time = new Date();
      const obj = { lastActivity, time };
      console.log(obj);
      setDisplayActivity(obj);
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
