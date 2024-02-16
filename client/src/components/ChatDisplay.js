import Chat from "./Chat";
import ChatInput from "./ChatInput";
import { useState, useEffect } from "react";
var moment = require("moment");

const ChatDisplay = ({ user, clickedUser, displayActivity }) => {
  const [userMessages, setUserMessages] = useState();
  const [clickedUserMessages, setClickedUserMessages] = useState();

  const userId = user?.userId;
  const clickedUserId = clickedUser.userId;

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

  useEffect(() => {
    getUsersMessages();
    getClickedUsersMessages();
  }, []);

  const messages = [];

  userMessages?.forEach((message) => {
    const formattedMessage = {};
    formattedMessage["name"] = user?.firstName;
    formattedMessage["img"] = user?.url;
    formattedMessage["message"] = message.message;
    let formattedDate = moment(message.createdAt).format("DD.MM.YYYY HH:mm:ss");
    formattedMessage["createdAt"] = formattedDate;
    messages.push(formattedMessage);
  });

  // displayActivity?.forEach((item) => {
  //   const formattedMessage = {};
  //   formattedMessage["message"] = item.lastActivity;
  //   let formattedDate = moment(item.time).format("DD.MM.YYYY HH:mm:ss");
  //   formattedMessage["createdAt"] = formattedDate;
  //   messages.push(formattedMessage);
  // });

  clickedUserMessages?.forEach((message) => {
    const formattedMessage = {};
    formattedMessage["name"] = clickedUser?.firstName;
    formattedMessage["img"] = clickedUser?.url;
    formattedMessage["message"] = message.message;
    let formattedDate = moment(message.createdAt).format("DD.MM.YYYY HH:mm:ss");
    formattedMessage["createdAt"] = formattedDate;
    messages.push(formattedMessage);
  });

  const descendingOrderMessages = messages?.sort((a, b) =>
    a.createdAt.localeCompare(b.createdAt)
  );

  return (
    <>
      <Chat
        descendingOrderMessages={descendingOrderMessages}
        displayActivity={displayActivity}
      />
      <ChatInput
        user={user}
        clickedUser={clickedUser}
        getUsersMessages={getUsersMessages}
        getClickedUsersMessages={getClickedUsersMessages}
      />
    </>
  );
};

export default ChatDisplay;
