// Import necessary modules and components from React, MUI, and React Router
import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@mui/material";

// Functional component DashboardHeader for displaying the header in the dashboard
const DashboardHeader = () => {
  const [cookies, setCookie, removeCookies] = useCookies(["user"]);

  // React Router hook for navigation
  let navigate = useNavigate();

  const userId = cookies.UserId;

  // Function to handle user logout
  const logout = () => {
    // Remove authentication cookies and navigate to the home page
    removeCookies("AuthToken", cookies.AuthToken);
    removeCookies("UserId", userId);
    navigate("/");
    navigate(0); // Forces a full page reload
  };

  // Render the DashboardHeader component
  return (
    <div id="pgHeader">
      {/* Material-UI AppBar component for the dashboard header */}
      <AppBar position="static">
        {/* Toolbar containing navigation buttons */}
        <Toolbar
          className="toolBar"
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* Navigation buttons for Home and Matches */}
          <div>
            <Button
              color="inherit"
              onClick={() => {
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

          {/* Navigation buttons for Settings and Logout */}
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
