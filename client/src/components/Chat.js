// Import the React library
import React from "react";

// Functional component Chat to display messages
const Chat = ({ descendingOrderMessages }) => {
  // Render the chat display with messages
  return (
    <div className="chatDisplay">
      {/* Map through messages in descending order */}
      {descendingOrderMessages.map((message, _index) => (
        <>
          {/* Check if the message is not a category */}
          {message.id !== "category" && (
            // Display regular chat message container
            <div key={_index} className="chatMessageContainer" id={message.id}>
              {/* Display user's profile image */}
              <img
                className="profileImg"
                src={message.img}
                alt={message.name + "profile"}
              />
              {/* Display the message content */}
              <p className="message">{message.message}</p>
              {/* Display the timestamp of the message */}
              <p className="timestamp">{message.createdAt}</p>
            </div>
          )}

          {/* Check if the message is a category */}
          {message.id === "category" && (
            // Display special chat message container for category
            <div key={_index} className="chatMessageContainer" id={message.id}>
              {/* Display the matched activity category message */}
              <p className="message">
                {"Matched Activity: " + message.message}
              </p>
            </div>
          )}
        </>
      ))}
    </div>
  );
};

// Export the Chat component as the default export
export default Chat;
