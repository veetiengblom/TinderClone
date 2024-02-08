import MatchesDisplay from "./MatchesDisplay";
import ChatHeader from "./ChatHeader";
import ChatDisplay from "./ChatDisplay";
import { useState } from "react";

const ChatContainer = ({ user }) => {
  const [clickedUser, setClickedUser] = useState();

  console.log("clicked user", clickedUser);

  return (
    <div className="chatContainer">
      <ChatHeader user={user} />
      <div>
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
      {clickedUser && <ChatDisplay user={user} clickedUser={clickedUser}/>}
    </div>
  );
};

export default ChatContainer;
