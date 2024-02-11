import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const ChatHeader = ({ user }) => {
  const [cookies, setCookie, removeCookies] = useCookies(["user"]);

  let navigate = useNavigate();

  const logout = () => {
    removeCookies("AuthToken", cookies.AuthToken);
    removeCookies("UserId", cookies.UserId);
    navigate("/");
    navigate(0);
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
