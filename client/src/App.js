import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import OnBoarding from "./pages/OnBoarding";
import Header from "./components/Header";
import UserProfile from "./pages/UserProfile";
import { useCookies } from "react-cookie";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatContainer from "./components/ChatContainer";
import { useState } from "react";

const App = () => {
  const [cookies, setCookie, removeCookies] = useCookies(["user"]);
  const [user, setUser] = useState(null);

  const authToken = cookies.AuthToken;
  console.log("User", user);

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
                <Header /> <Dashboard setUser={setUser} user={user} />{" "}
              </>
            }
          ></Route>
        )}

        <Route
          path="/chat"
          element={
            <>
              {" "}
              <Header /> <ChatContainer user={user} /> <UserProfile />{" "}
            </>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
