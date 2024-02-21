import MatchesDisplay from "./MatchesDisplay";
import ChatHeader from "./ChatHeader";
import ChatDisplay from "./ChatDisplay";
import { useState } from "react";
import { Button } from "@mui/material";

const ChatContainer = ({
  user,
  showActivity,
  setShowActivity,
  clickedUser,
  setClickedUser,
}) => {
  const handleClick = () => {
    setClickedUser(null);
    setShowActivity(false);
  };
  const activityBtnClick = () => {
    showActivity ? setShowActivity(false) : setShowActivity(true);
  };
  return (
    <div className="chatContainer">
      <ChatHeader user={user} />
      <div className="btnContainer">
        <Button className="option" onClick={() => handleClick()}>
          Matches
        </Button>
        <Button className="option" disabled={!clickedUser}>
          Chat
        </Button>
      </div>
      {!clickedUser && (
        <MatchesDisplay
          matches={user.matches}
          setClickedUser={setClickedUser}
        />
      )}
      {clickedUser && <ChatDisplay user={user} clickedUser={clickedUser} />}
      {clickedUser && (
        <button
          className="secondaryBtn"
          onClick={() => {
            activityBtnClick();
          }}
        >
          {showActivity ? "Cancel Activity" : "Choose Activity"}
        </button>
      )}
    </div>
  );
};

export default ChatContainer;
