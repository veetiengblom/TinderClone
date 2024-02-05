import MatchesDisplay from "./MatchesDisplay";
import ChatHeader from "./ChatHeader";
import ChatDisplay from "./ChatDisplay";

const ChatContainer = () => {
  return (
    <div className="chatContainer">
      <ChatHeader />
      <div>
        <button className="option">Matches</button>
        <button className="option">Chat</button>
      </div>
      <MatchesDisplay />
      <ChatDisplay />
    </div>
  );
};

export default ChatContainer;
