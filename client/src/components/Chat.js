import React from "react";

const Chat = ({ descendingOrderMessages }) => {
  return (
    <div className="chatDisplay">
      {descendingOrderMessages.map((message, _index) => (
        <>
          {message.id !== "category" && (
            <div key={_index} className="chatMessageContainer" id={message.id}>
              <img
                className="profileImg"
                src={message.img}
                alt={message.name + "profile"}
              />
              <p className="message">{message.message}</p>
              <p className="timestamp">{message.createdAt}</p>
            </div>
          )}

          {message.id === "category" && (
            <div key={_index} className="chatMessageContainer" id={message.id}>
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

export default Chat;
