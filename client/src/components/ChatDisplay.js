import Chat from "./Chat";
import ChatInput from "./ChatInput";
import { useState, useEffect } from "react";

const ChatDisplay = ({ user, clickedUser }) => {
  const [userMessages, setUserMessages] = useState();
  const [clickedUserMessages, setClickedUserMessages] = useState();

  const userId = user?.userId;
  const clickedUserId = clickedUser.userId;

  const getUsersMessages = async () => {
    try {
      const response = await fetch("/index/messages", {
        method: "GET",
        headers: {
          params: { userId: userId, correspondingUserId: clickedUserId },
        },
      });
      const data = await response.json();
      setUserMessages(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getClickedUsersMessages = async () => {
    try {
      const response = await fetch("/index/messages", {
        method: "GET",
        headers: {
          params: { userId: clickedUserId, correspondingUserId: userId },
        },
      });
      const data = await response.json();
      setUserMessages(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsersMessages();
    getClickedUsersMessages();
  }, [userMessages, clickedUserMessages]);

  const messages = [];

  userMessages?.forEach((message) => {
    const formattedMessage = {};
    formattedMessage["name"] = user?.firstName;
    formattedMessage["img"] = user?.url;
    formattedMessage["message"] = message.message;
    formattedMessage["timestamp"] = message.timestamp;
    messages.push(formattedMessage);
  });

  console.log("usermessage", userMessages);
  console.log("formatted messages", messages);

  return (
    <>
      <Chat />
      <ChatInput />
    </>
  );
};

export default ChatDisplay;
