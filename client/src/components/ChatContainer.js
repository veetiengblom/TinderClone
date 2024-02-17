import MatchesDisplay from "./MatchesDisplay";
import ChatHeader from "./ChatHeader";
import ChatDisplay from "./ChatDisplay";
import { useState } from "react";

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
        <button className="option" onClick={() => handleClick()}>
          Matches
        </button>
        <button className="option" disabled={!clickedUser}>
          Chat
        </button>
      </div>
      {!clickedUser && (
        <MatchesDisplay
          matches={user.matches}
          setClickedUser={setClickedUser}
        />
      )}
      {clickedUser && <ChatDisplay user={user} clickedUser={clickedUser}/>}
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
