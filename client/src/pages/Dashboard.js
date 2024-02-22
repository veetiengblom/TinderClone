import { useState } from "react";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

//Used React-tinder-card element from 3DJakob
import TinderCard from "react-tinder-card";
import { useUser } from "../hooks/useUser";
import { useGenderedUsers } from "../hooks/useGenderedUsers";

const Dashboard = () => {
  const [lastDirection, setLastDirection] = useState();
  const [cookies, setCookie, removeCookies] = useCookies(["user"]);
  const [userIteration, setUserIteration] = useState(0);

  const userId = cookies.UserId;
  const { user } = useUser(userId, userIteration);
  const genderedUsers = useGenderedUsers(user);

  let navigate = useNavigate();

  const customToast = (name) => {
    const handleClick = (value) => {
      if (value) {
        navigate("/matches");
      }
    };

    return (
      <div>
        <h2>Match With {name}!</h2>
        <Button onClick={() => handleClick(true)}>Chat</Button>
      </div>
    );
  };

  const toastToChat = (name) => toast.info(customToast(name));

  const updateMatches = async (matchedUserId, name) => {
    try {
      const response = await fetch("/index/addmatch", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ userId, matchedUserId }),
      });
      setUserIteration((prevIteration) => prevIteration + 1);

      if (response.status === 200) {
        console.log("haloo");
        toastToChat(name);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const swiped = (direction, swipedUserId, name) => {
    if (direction === "right") {
      updateMatches(swipedUserId, name);
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
      <ToastContainer position="top-left" closeButton />
      {user && (
        <div className="dashboard">
          <div className="swipeContainer">
            <div className="cardContainer">
              {filteredGenderUsers?.length > 0 ? (
                filteredGenderUsers.map((genderedUsers) => (
                  <TinderCard
                    className="swipe"
                    key={genderedUsers.userId}
                    onSwipe={(dir) =>
                      swiped(dir, genderedUsers.userId, genderedUsers.firstName)
                    }
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
