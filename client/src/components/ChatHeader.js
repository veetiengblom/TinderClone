// Import the React library
import React from "react";

// Functional component ChatHeader to display user information in the chat header
const ChatHeader = ({ user }) => {
  // Render the chat header with user's profile information
  return (
    <div className="chatContainerHeader">
      {/* Display the user's profile image and name */}
      <div className="profile">
        <div className="imgContainer">
          {/* Display the user's profile image */}
          <img
            className="profileImg"
            src={user.url}
            alt={"photo of " + user.fistName}
          />
        </div>
        {/* Display the user's first name */}
        <h3>{user.firstName}</h3>
      </div>
    </div>
  );
};

// Export the ChatHeader component as the default export
export default ChatHeader;
