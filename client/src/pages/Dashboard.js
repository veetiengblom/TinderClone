import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

//Used React-tinder-card element from 3DJakob
import TinderCard from "react-tinder-card";
import { useUser } from "../hooks/useUser";
import { useGenderedUsers } from "../hooks/useGenderedUsers";

const Dashboard = ({}) => {
  const [lastDirection, setLastDirection] = useState();
  const [cookies, setCookie, removeCookies] = useCookies(["user"]);
  const [userIteration, setUserIteration] = useState(0);

  const userId = cookies.UserId;
  const { user } = useUser(userId, userIteration);
  const genderedUsers = useGenderedUsers(user);

  const updateMatches = async (matchedUserId) => {
    try {
      const response = await fetch("/index/addmatch", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ userId, matchedUserId }),
      });
      setUserIteration(userIteration++);
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

  const filteredGenderUsers = genderedUsers?.filter(
    (genderedUsers) => !matchedUsersIds.includes(genderedUsers.userId)
  );

  return (
    <>
      {user && (
        <div className="dashboard">
          <div className="swipeContainer">
            <div className="cardContainer">
              {filteredGenderUsers?.length > 0 ? (
                filteredGenderUsers.map((genderedUsers) => (
                  <TinderCard
                    className="swipe"
                    key={genderedUsers.userId}
                    onSwipe={(dir) => swiped(dir, genderedUsers.userId)}
                    onCardLeftScreen={() => outOfFrame(genderedUsers.firstName)}
                  >
                    <div
                      className="card"
                      style={{
                        backgroundImage: "url(" + genderedUsers.url + ")",
                      }}
                    >
                      <h3>{genderedUsers.firstName}</h3>
                    </div>
                  </TinderCard>
                ))
              ) : (
                <h1>No more users to show</h1>
              )}
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
