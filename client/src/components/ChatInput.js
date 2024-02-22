// Import the React library and the useState hook
import React from "react";
import { useState } from "react";

// Functional component ChatInput to handle user input for sending messages
const ChatInput = ({
  user,
  clickedUser,
  getUsersMessages,
  getClickedUsersMessages,
}) => {
  // State variable to store the text area input value
  const [textArea, setTextArea] = useState("");

  // Extract user and clicked user IDs from the provided data
  const userId = user?.userId;
  const clickedUserId = clickedUser?.userId;

  // Function to add a new message to the chat
  const addMessage = async () => {
    // Trim the input to check if it's not empty
    const trimmedInput = textArea.trim();

    // Check if the input is not empty
    if (trimmedInput !== "") {
      // Create a message object with sender and receiver IDs, message content, and category flag
      const message = {
        fromUserId: userId,
        toUserId: clickedUserId,
        message: textArea,
        category: false,
      };

      try {
        // Send a POST request to the server to add the message
        await fetch("/index/addMessage", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ message }),
        });

        // Fetch updated messages for the user and clicked user
        getUsersMessages();
        getClickedUsersMessages();

        // Clear the text area after sending the message
        setTextArea("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Render the ChatInput component with a text area and a submit button
  return (
    <div className="chatInput">
      {/* Text area for user input */}
      <textarea
        value={textArea}
        onChange={(e) => setTextArea(e.target.value)}
      ></textarea>

      {/* Button to submit the message */}
      <button className="secondaryBtn" onClick={addMessage}>
        Submit
      </button>
    </div>
  );
};

// Export the ChatInput component as the default export
export default ChatInput;
