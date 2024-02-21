import ChatContainer from "../components/ChatContainer";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

//Used React-tinder-card element from 3DJakob
import TinderCard from "react-tinder-card";
import { useUser } from "../hooks/useUser";

const Matches = ({}) => {
  const [showActivity, setShowActivity] = useState(false);
  const [clickedUser, setClickedUser] = useState(null);
  const [lastDirection, setLastDirection] = useState();
  const [activities, setActivities] = useState();
  const [cookies, setCookie, removeCookies] = useCookies(["user"]);

  const userId = cookies.UserId;
  const { user } = useUser(userId);

  console.log(user);

  const userActivities = user?.activities;
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
      setActivities(data[0].activity);
    } catch (error) {
      console.log(error);
    }
  };

  const getMachedActivities = async (userId, clickedUserId) => {
    try {
      const response = await fetch("/index/getMachedActivities", {
        method: "GET",
        headers: {
          params: JSON.stringify({ userId, clickedUserId }),
        },
      });
      const data = await response.json();
      const lastActivity = data.slice(-1).toString();
      return lastActivity;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getActivities();
  }, [showActivity]);

  const addActivities = async (userId, swipedActivity, clickedUserId) => {
    try {
      const response = await fetch("/index/addActivity", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ userId, clickedUserId, swipedActivity }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addMessage = async (userId, clickedUserId, text) => {
    const message = {
      fromUserId: userId,
      toUserId: clickedUserId,
      message: text,
      category: true,
    };

    try {
      await fetch("/index/addMessage", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const swiped = async (direction, swipedActivity) => {
    if (direction === "right") {
      await addActivities(user.userId, swipedActivity, clickedUser.userId);
      const message = await getMachedActivities(
        user.userId,
        clickedUser.userId
      );
      addMessage(user.userId, clickedUser.userId, message);
    }

    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name, "left the screen!");
  };

  return (
    <>
      {user && (
        <div className="matches">
          <ChatContainer
            user={user}
            showActivity={showActivity}
            setShowActivity={setShowActivity}
            clickedUser={clickedUser}
            setClickedUser={setClickedUser}
          />
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
      )}
    </>
  );
};

export default Matches;
