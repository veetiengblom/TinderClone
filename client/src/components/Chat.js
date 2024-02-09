import React from "react";

const Chat = ({ descendingOrderMessages }) => {
  return (
    <div className="chatDisplay">
      {descendingOrderMessages.map((message, _index) => (
        <div key={_index}>
          <div className="chatMessageHeader">
            <div className="imgContainer">
              <img
                className="profileImg"
                src={message.img}
                alt={message.name + "profile"}
              ></img>
            </div>
            <p>{message.name}</p>
          </div>
          <p>{message.message}</p>
        </div>
      ))}
    </div>
  );
};

export default Chat;
