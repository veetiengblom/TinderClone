import { useState, useEffect, useMemo } from "react";
import { useCookies } from "react-cookie";
import ChatContainer from "../components/ChatContainer";

//Used React-tinder-card element from 3DJakob
import TinderCard from "react-tinder-card";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [genderedUser, setGenderedUsers] = useState(null);
  const [lastDirection, setLastDirection] = useState();
  const [cookies, setCookie, removeCookies] = useCookies(["user"]);
  const [isloaded, setIsloaded] = useState(false);

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
      const response = await fetch("/index/genderedUsers", {
        method: "GET",
        headers: {
          params: user.genderInterest,
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

  return (
    <>
      {user && (
        <div className="dashboard">
          <ChatContainer user={user} />
          <div className="swipeContainer">
            <div className="cardContainer">
              {filteredGenderUsers?.map((genderedUser) => (
                <TinderCard
                  className="swipe"
                  key={genderedUser.firstName}
                  onSwipe={(dir) => swiped(dir, genderedUser.userId)}
                  onCardLeftScreen={() => outOfFrame(genderedUser.firstName)}
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
        </div>
      )}
    </>
  );
};

export default Dashboard;
