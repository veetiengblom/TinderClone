// Import necessary modules from React and external libraries
import { useState } from "react";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import TinderCard from "react-tinder-card"; 
import { useUser } from "../hooks/useUser"; 
import { useGenderedUsers } from "../hooks/useGenderedUsers";

// Dashboard component
const Dashboard = () => {
  const [lastDirection, setLastDirection] = useState();
  const [cookies, setCookie, removeCookies] = useCookies(["user"]);
  const [userIteration, setUserIteration] = useState(0);

  const userId = cookies.UserId;
  const { user } = useUser(userId, userIteration);

  const genderedUsers = useGenderedUsers(user);

  let navigate = useNavigate();

  // Custom toast message to display when a match occurs
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

  // Function to display a toast message for a match
  const toastToChat = (name) => toast.info(customToast(name));

  // Function to update matches in the database
  const updateMatches = async (matchedUserId, name) => {
    try {
      const response = await fetch("/index/addmatch", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ userId, matchedUserId }),
      });

      // Update the user iteration to trigger a re-fetch of user data
      setUserIteration((prevIteration) => prevIteration + 1);

      if (response.status === 200) {
        toastToChat(name); // Display toast message for a match
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function called when a card is swiped
  const swiped = (direction, swipedUserId, name) => {
    if (direction === "right") {
      updateMatches(swipedUserId, name); // Update matches for a right swipe
    }

    setLastDirection(direction);
  };

  // Function called when a card goes out of the swipe container
  const outOfFrame = (name) => {
    console.log(name, "left the screen!");
  };

  const matchedUsersIds = user?.matches.map(({ userId }) => userId).concat(userId);

  const filteredGenderUsers = genderedUsers?.filter(
    (genderedUsers) => !matchedUsersIds.includes(genderedUsers.userId)
  );

  // JSX structure of the Dashboard component
  return (
    <>
      <ToastContainer position="top-left" closeButton />
      {user && (
        <div className="dashboard">
          <div className="swipeContainer">
            <div className="cardContainer">
              {filteredGenderUsers?.length > 0 ? (
                // Map through filteredGenderUsers to create TinderCard components
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
