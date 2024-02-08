import React from "react";
import { useCookies } from "react-cookie";

const ChatHeader = ({ user }) => {
  const [cookies, setCookie, removeCookies] = useCookies(["user"]);

  const logout = () => {
    removeCookies("AuthToken", cookies.AuthToken);
    removeCookies("UserId", cookies.UserId);
    window.location.reload();
  };

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
      <i className="logOutIcon" onClick={logout}>
        ⬅️
      </i>
    </div>
  );
};

export default ChatHeader;
