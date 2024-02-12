import React from "react";

const ChatHeader = ({ user }) => {
  return (
    <div className="chatContainerHeader">
      <div className="profile">
        <div className="imgContainer">
          <img
            className="profileImg"
            src={user.url}
            alt={"photo of " + user.fistName}
          />
        </div>
        <h3>{user.firstName}</h3>
      </div>
    </div>
  );
};

export default ChatHeader;
