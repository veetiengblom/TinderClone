import MatchesDisplay from "./MatchesDisplay";
import ChatHeader from "./ChatHeader";
import ChatDisplay from "./ChatDisplay";
import { useState } from "react";

const ChatContainer = ({
  user,
  setShowActivity,
  clickedUser,
  setClickedUser,
}) => {
  return (
    <div className="chatContainer">
      <ChatHeader user={user} />
      <div className="btnContainer">
        <button className="option" onClick={() => setClickedUser(null)}>
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
      {clickedUser && <ChatDisplay user={user} clickedUser={clickedUser} />}
      {clickedUser && (
        <button
          className="secondaryBtn"
          onClick={() => {
            setShowActivity(true);
          }}
        >
          Choose Activity
        </button>
      )}
    </div>
  );
};

export default ChatContainer;
