import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div id="pgHeader">
      <AppBar position="static">
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <Button color="inherit" to="/dashboard" component={Link}>
              {"Home"}
            </Button>
            <Button color="inherit" to="/chat" component={Link}>
              {"Matches"}
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default Header;
