// Import necessary components and libraries from Material-UI and local files
import Chat from "./Chat";
import ChatInput from "./ChatInput";
import { useState, useEffect } from "react";
var moment = require("moment");

// Functional component ChatDisplay to manage and display chat messages
const ChatDisplay = ({ user, clickedUser }) => {
  // State variables to store user's and clicked user's messages
  const [userMessages, setUserMessages] = useState();
  const [clickedUserMessages, setClickedUserMessages] = useState();

  // Extract user and clicked user IDs from the provided data
  const userId = user?.userId;
  const clickedUserId = clickedUser.userId;

  // Function to fetch user's messages from the server
  const getUsersMessages = async () => {
    try {
      const response = await fetch("/index/messages", {
        method: "GET",
        headers: {
          params: JSON.stringify({
            senderId: userId,
            receiverId: clickedUserId,
          }),
        },
      });
      const data = await response.json();
      setUserMessages(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to fetch clicked user's messages from the server
  const getClickedUsersMessages = async () => {
    try {
      const response = await fetch("/index/messages", {
        method: "GET",
        headers: {
          params: JSON.stringify({
            senderId: clickedUserId,
            receiverId: userId,
          }),
        },
      });
      const data = await response.json();
      setClickedUserMessages(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch messages when the component mounts
  useEffect(() => {
    getUsersMessages();
    getClickedUsersMessages();
  }, []);

  // Array to store formatted chat messages
  const messages = [];

  // Process user's messages and format them for display
  userMessages?.forEach((message) => {
    const formattedMessage = {};
    const id = message.category ? "category" : "sender";

    formattedMessage["id"] = id;
    formattedMessage["name"] = user?.firstName;
    formattedMessage["img"] = user?.url;
    formattedMessage["message"] = message.message;
    let formattedDate = moment(message.createdAt).format("HH:mm DD.MM.YYYY");
    let compareDate = moment(message.createdAt).format("DD.MM.YYYY HH:mm:ss");
    formattedMessage["createdAt"] = formattedDate;
    formattedMessage["compareDate"] = compareDate;
    messages.push(formattedMessage);
  });

  // Process clicked user's messages and format them for display
  clickedUserMessages?.forEach((message) => {
    const formattedMessage = {};
    const id = message.category ? "category" : "receiver";
    formattedMessage["id"] = id;
    formattedMessage["name"] = clickedUser?.firstName;
    formattedMessage["img"] = clickedUser?.url;
    formattedMessage["message"] = message.message;
    let formattedDate = moment(message.createdAt).format("HH:mm DD.MM.YYYY");
    let compareDate = moment(message.createdAt).format("DD.MM.YYYY HH:mm:ss");
    formattedMessage["createdAt"] = formattedDate;
    formattedMessage["compareDate"] = compareDate;
    messages.push(formattedMessage);
  });

  // Sort messages in descending order based on timestamp
  const descendingOrderMessages = messages?.sort((a, b) =>
    a.compareDate.localeCompare(b.compareDate)
  );

  // Render ChatDisplay component with Chat and ChatInput
  return (
    <>
      {/* Display the chat messages */}
      <Chat descendingOrderMessages={descendingOrderMessages} />
      {/* Display the chat input for sending new messages */}
      <ChatInput
        user={user}
        clickedUser={clickedUser}
        getUsersMessages={getUsersMessages}
        getClickedUsersMessages={getClickedUsersMessages}
      />
    </>
  );
};

// Export the ChatDisplay component as the default export
export default ChatDisplay;
