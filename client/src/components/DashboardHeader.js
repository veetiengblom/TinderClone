import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AppBar, Toolbar, Button } from "@mui/material";

const DashboardHeader = ({ setShowMatchPage, setUser }) => {
  const [cookies, setCookie, removeCookies] = useCookies(["user"]);

  const handleClick = (value) => {
    console.log(value);
    setShowMatchPage(value);
  };
  let navigate = useNavigate();

  const userId = cookies.UserId;

  const logout = () => {
    removeCookies("AuthToken", cookies.AuthToken);
    removeCookies("UserId", userId);
    navigate("/");
    navigate(0);
  };

  return (
    <div id="pgHeader">
      <AppBar position="static">
        <Toolbar className="toolBar"
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Button
              color="inherit"
              onClick={() => {
                // handleClick(false);
                navigate("/dashboard");
              }}
            >
              {"Home"}
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                navigate("/matches");
              }}
            >
              {"Matches"}
            </Button>
          </div>
          <div>
            <Button
              color="inherit"
              onClick={() => {
                navigate("/settings");
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
