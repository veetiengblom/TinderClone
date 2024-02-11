import React from "react";

const Chat = ({ descendingOrderMessages }) => {
  return (
    <div className="chatDisplay">
      {descendingOrderMessages.map((message, _index) => (
        <div key={_index} className="chatMessageContainer">
          <div className="imgContainer">
            <img
              className="profileImg"
              src={message.img}
              alt={message.name + "profile"}
            ></img>
          </div>

          <p>{message.message}</p>
        </div>
      ))}
    </div>
  );
};

export default Chat;
