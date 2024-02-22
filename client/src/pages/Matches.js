// Import necessary modules and components
import ChatContainer from "../components/ChatContainer";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import TinderCard from "react-tinder-card";
import { useUser } from "../hooks/useUser";

// Matches component
const Matches = () => {
  // State variables for controlling various aspects of the component
  const [showActivity, setShowActivity] = useState(false);
  const [clickedUser, setClickedUser] = useState(null);
  const [lastDirection, setLastDirection] = useState(undefined);
  const [activities, setActivities] = useState(undefined);
  const [cookies, setCookie, removeCookies] = useCookies(["user"]);

  // Fetch user details using the useUser hook
  const userId = cookies.UserId;
  const { user } = useUser(userId);

  // Filter matched activities between the current user and the clicked user
  const userActivities = user?.activities;
  const clickedUserActivities = clickedUser?.activities;
  const matchedActivities = userActivities?.filter((x) =>
    clickedUserActivities?.includes(x)
  );

  // Fetch activities based on matched activities
  const getActivities = async () => {
    try {
      const response = await fetch("/index/getActivities", {
        method: "GET",
        headers: {
          params: JSON.stringify(matchedActivities),
        },
      });
      const data = await response.json();
      if (data[0]) {
        setActivities(data[0].activity);
        return;
      }
      setActivities(undefined);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch matched activities between the current user and clicked user
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

  // useEffect hook to fetch activities when showActivity changes
  useEffect(() => {
    if (matchedActivities) {
      getActivities();
    }
  }, [showActivity]);

  // Function to add matched activities between the users
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

  // Function to add a message when users swipe right
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

  // Function to handle the swipe action
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

  // Function called when a TinderCard goes out of frame
  const outOfFrame = (name) => {
    console.log(name, "left the screen!");
  };

  // JSX structure of the Matches component
  return (
    <>
      {user && (
        <div className="matches">
          {/* Render the ChatContainer component */}
          <ChatContainer
            user={user}
            showActivity={showActivity}
            setShowActivity={setShowActivity}
            clickedUser={clickedUser}
            setClickedUser={setClickedUser}
          />
          {!clickedUser && !showActivity && (
            // Render TinderCard for the current user
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
            // Render TinderCard for the clicked user
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
          {showActivity && activities && (
            // Render TinderCards for matched activities
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
          {showActivity && !activities && (
            // Render a message if there are no activities to show
            <div className="emptyMessageContainer">
              <h1>No Activities To Show</h1>
            </div>
          )}
        </div>
      )}
    </>
  );
};

// Export the Matches component
export default Matches;
