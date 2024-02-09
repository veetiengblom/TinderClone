import React from "react";

import { useState } from "react";

const ChatInput = ({
  user,
  clickedUser,
  getUsersMessages,
  getClickedUsersMessages,
}) => {
  const [textArea, setTextArea] = useState(undefined);

  const userId = user?.userId;
  const clickedUserId = clickedUser?.userId;

  const addMessage = async () => {
    const message = {
      fromUserId: userId,
      toUserId: clickedUserId,
      message: textArea,
    };

    try {
      await fetch("/index/addMessage", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      getUsersMessages();
      getClickedUsersMessages();
      setTextArea("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="chatInput">
      <textarea
        value={textArea}
        onChange={(e) => setTextArea(e.target.value)}
      ></textarea>
      <button className="secondaryBtn" onClick={addMessage}>
        Submit
      </button>
    </div>
  );
};

export default ChatInput;
