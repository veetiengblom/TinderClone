// Import necessary components and libraries
import MatchesDisplay from "./MatchesDisplay";
import ChatHeader from "./ChatHeader";
import ChatDisplay from "./ChatDisplay";
import { Button } from "@mui/material";

// Functional component ChatContainer to manage chat-related functionality
const ChatContainer = ({
  user,
  showActivity,
  setShowActivity,
  clickedUser,
  setClickedUser,
}) => {
  // Event handler to reset clicked user and hide activity
  const handleClick = () => {
    setClickedUser(null);
    setShowActivity(false);
  };

  // Event handler to toggle the display of activity
  const activityBtnClick = () => {
    showActivity ? setShowActivity(false) : setShowActivity(true);
  };

  // Render the ChatContainer component
  return (
    <div className="chatContainer">
      {/* Display the chat header with user information */}
      <ChatHeader user={user} />
      
      {/* Container for navigation buttons: Matches and Chat */}
      <div className="btnContainer">
        {/* Button to show Matches and reset clicked user */}
        <Button className="option" onClick={() => handleClick()}>
          Matches
        </Button>
        
        {/* Button to show Chat (disabled if no user is clicked) */}
        <Button className="option" disabled={!clickedUser}>
          Chat
        </Button>
      </div>
      
      {/* Display Matches if no user is clicked */}
      {!clickedUser && (
        <MatchesDisplay
          matches={user.matches}
          setClickedUser={setClickedUser}
        />
      )}

      {/* Display Chat if a user is clicked */}
      {clickedUser && <ChatDisplay user={user} clickedUser={clickedUser} />}

      {/* Display button for choosing or canceling activity */}
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

// Export the ChatContainer component as the default export
export default ChatContainer;
