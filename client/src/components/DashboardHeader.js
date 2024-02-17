import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@mui/material";

const DashboardHeader = ({ setShowMatchPage }) => {
  const [cookies, setCookie, removeCookies] = useCookies(["user"]);
  const handleClick = (value) => {
    console.log(value);
    setShowMatchPage(value);
  };
  let navigate = useNavigate();

  const logout = () => {
    removeCookies("AuthToken", cookies.AuthToken);
    removeCookies("UserId", cookies.UserId);
    navigate("/");
    navigate(0);
  };
  return (
    <div id="pgHeader">
      <AppBar position="static">
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <Button
              color="inherit"
              onClick={() => {
                handleClick(false);
              }}
            >
              {"Home"}
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                handleClick(true);
              }}
            >
              {"Matches"}
            </Button>
          </div>
          <div>
          <Button
              color="inherit"
              onClick={() => {
                
              }}
            >
              {"Settings"}
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                logout();
              }}
            >
              {"Logout"}
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default DashboardHeader;
