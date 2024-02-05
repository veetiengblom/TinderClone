import { useState } from "react";

//Used React-tinder-card element from 3DJakob
import TinderCard from "react-tinder-card";

const Dashboard = () => {
  const characters = [
    {
      name: "richad marmed",
      url: "https://imgur.com/a6KdUW5.jpg",
    },
    {
      name: "Zlatan ibra",
      url: "https://imgur.com/6ePfo5i.jpg",
    },
    {
      name: "mister munu",
      url: "https://imgur.com/6ePfo5i.jpg",
    },
  ];
  const [lastDirection, setLastDirection] = useState();

  const swiped = (direction, nameToDelete) => {
    console.log("removing", nameToDelete);
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name, "left the screen!");
  };

  return (
    <div className="dashboard">
      {/* <ChatContainer /> */}
      <div className="swipeContainer">
        <div className="cardContainer">
          {characters.map((character) => (
            <TinderCard
              className="swipe"
              key={character.name}
              onSwipe={(dir) => swiped(dir, character.name)}
              onCardLeftScreen={() => outOfFrame(character.name)}
            >
              <div
                className="card"
                style={{ backgroundImage: "url(" + character.url + ")" }}
              >
                <h3>{character.name}</h3>
              </div>
            </TinderCard>
          ))}
        </div>
        <div className="swipeInfo">
          {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;