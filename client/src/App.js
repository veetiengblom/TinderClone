import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import OnBoarding from "./pages/OnBoarding";
import Settings from "./pages/Settings";
import DashboardHeader from "./components/DashboardHeader";
import Matches from "./pages/Matches";
import { useCookies } from "react-cookie";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  const [cookies, setCookie, removeCookies] = useCookies(["user"]);

  const authToken = cookies.AuthToken;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        {authToken && (
          <Route path="/onboarding" element={<OnBoarding />}></Route>
        )}
        {authToken && (
          <Route
            path="/dashboard"
            element={
              <>
                {" "}
                <DashboardHeader />
                <Dashboard />{" "}
              </>
            }
          ></Route>
        )}
        {authToken && (
          <Route
            path="/matches"
            element={
              <>
                <DashboardHeader />
                <Matches />{" "}
              </>
            }
          ></Route>
        )}
        {authToken && (
          <Route
            path="/settings"
            element={
              <>
                {" "}
                <DashboardHeader />
                <Settings />{" "}
              </>
            }
          ></Route>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
