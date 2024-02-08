import { useState, useEffect, useMemo } from "react";
import { useCookies } from "react-cookie";
import ChatContainer from "../components/ChatContainer";
import axios from "axios";

//Used React-tinder-card element from 3DJakob
import TinderCard from "react-tinder-card";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [genderedUser, setGenderedUsers] = useState(null);
  const [lastDirection, setLastDirection] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingGenderedUsers, setIsLoadingGenderedUsers] = useState(true);
  const [cookies, setCookie, removeCookies] = useCookies(["user"]);

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
    } finally {
      setIsLoading(false);
    }
  };

  const getGenderedUsers = async () => {
    try {
      console.log("getting gender");
      console.log("gender inderset", user.genderInterest);
      const response = await fetch("/index/genderedUsers", {
        method: "GET",
        headers: {
          params: user.genderInterest,
        },
      });
      const data = await response.json();
      setGenderedUsers(data);
      console.log("genderUser fecthed");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getUser();
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!isLoading) {
        console.log("user", user);
        await getGenderedUsers();
        setIsLoadingGenderedUsers(false);
      }
    };

    fetchData();
  }, [isLoading]); // Trigger the effect when 'user' changes

  useEffect(() => {
    if (!isLoadingGenderedUsers) {
      console.log("do nothing");
    }
  }, [isLoadingGenderedUsers]);

  // useEffect(() => {
  //   if (!isLoading) {
  //     console.log("user", user);

  //     getGenderedUsers();
  //   }
  // }, [isLoading]);

  // if (user) {
  //   console.log("genderedUser", genderedUser);
  // }

  // console.log("user", user);

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

  const filteredGenderUsers = useMemo(() => {
    if (!genderedUser || !user) {
      return [];
    }

    const matchedUsersIds = user.matches
      .map(({ userId }) => userId)
      .concat(user.userId);

    return genderedUser.filter(
      (gUser) => !matchedUsersIds.includes(gUser.userId)
    );
  }, [genderedUser, user]);

  // const matchedUsersIds = user?.matches
  //   ? user.matches.map(({ userId }) => userId).concat(userId)
  //   : [];

  // console.log("matches", matchedUsersIds);

  // const filteredGenderUsers = genderedUser
  //   ? genderedUser.filter(
  //       (genderedUser) => !matchedUsersIds.includes(genderedUser.userId)
  //     )
  //   : [];

  console.log("filter", filteredGenderUsers);

  return (
    <div className="dashboard">
      {genderedUser && (
        <>
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
                    style={{ backgroundImage: "url(" + genderedUser.url + ")" }}
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
        </>
      )}
    </div>
  );
};

export default Dashboard;
