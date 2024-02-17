import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import ChatContainer from "../components/ChatContainer";
import DashboardHeader from "../components/DashboardHeader";
import DisplayUser from "../components/DisplayUser";

//Used React-tinder-card element from 3DJakob
import TinderCard from "react-tinder-card";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [genderedUser, setGenderedUsers] = useState(null);
  const [lastDirection, setLastDirection] = useState();
  const [cookies, setCookie, removeCookies] = useCookies(["user"]);
  const [isloaded, setIsloaded] = useState(false);
  const [showMatcPage, setShowMatchPage] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  const [clickedUser, setClickedUser] = useState(null);
  const [displayActivity, setDisplayActivity] = useState(null);

  const userId = cookies.UserId;

  const getUser = async () => {
    try {
      const response = await fetch("/index/user", {
        method: "GET",
        headers: {
          params: userId,
        },
      });

      const data = await response.json();

      setUser(data.existingUser);
    } catch (error) {
      console.log(error);
    }
  };

  const getGenderedUsers = async () => {
    try {
      const userGenderInterest = user.genderInterest;
      const userGenderIdentity = user.genderIdentity;
      const response = await fetch("/index/genderedUsers", {
        method: "GET",
        headers: {
          params: JSON.stringify({
            userGenderInterest: userGenderInterest,
            userGenderIdentity: userGenderIdentity,
          }),
        },
      });
      const data = await response.json();
      setGenderedUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
    setIsloaded(true);
  }, [isloaded]);

  if (user) {
    if (isloaded) {
      getGenderedUsers();
      setIsloaded(false);
    }
  }

  const updateMatches = async (matchedUserId) => {
    try {
      const response = await fetch("/index/addmatch", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ userId, matchedUserId }),
      });
      getUser();
    } catch (error) {
      console.log(error);
    }
  };

  const swiped = (direction, swipedUserId) => {
    if (direction === "right") {
      updateMatches(swipedUserId);
    }

    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name, "left the screen!");
  };

  const matchedUsersIds = user?.matches
    .map(({ userId }) => userId)
    .concat(userId);

  const filteredGenderUsers = genderedUser?.filter(
    (genderedUser) => !matchedUsersIds.includes(genderedUser.userId)
  );
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //NEED TO SETUP A WAY TO CHANGE THE VIEW
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  return (
    <>
      <DashboardHeader setShowMatchPage={setShowMatchPage} />
      {user && (
        <div className="dashboard">
          <>
            {showMatcPage && (
              <ChatContainer
                user={user}
                showActivity={showActivity}
                setShowActivity={setShowActivity}
                clickedUser={clickedUser}
                setClickedUser={setClickedUser}
                displayActivity={displayActivity}
              />
            )}
            {!showMatcPage && (
              <div className="swipeContainer">
                <div className="cardContainer">
                  {filteredGenderUsers?.map((genderedUser) => (
                    <TinderCard
                      className="swipe"
                      key={genderedUser.userId}
                      onSwipe={(dir) => swiped(dir, genderedUser.userId)}
                      onCardLeftScreen={() =>
                        outOfFrame(genderedUser.firstName)
                      }
                    >
                      <div
                        className="card"
                        style={{
                          backgroundImage: "url(" + genderedUser.url + ")",
                        }}
                      >
                        <h3>{genderedUser.firstName}</h3>
                      </div>
                    </TinderCard>
                  ))}
                </div>
                <div className="swipeInfo">
                  {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
                </div>
              </div>
            )}
            {showMatcPage && (
              <DisplayUser
                user={user}
                clickedUser={clickedUser}
                showActivity={showActivity}
                setDisplayActivity={setDisplayActivity}
              />
            )}
          </>
        </div>
      )}
    </>
  );
};

export default Dashboard;
