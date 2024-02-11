import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import OnBoarding from "./pages/OnBoarding";
import Header from "./components/Header";
import { useCookies } from "react-cookie";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatContainer from "./components/ChatContainer";

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
                <Header /> <Dashboard />{" "}
              </>
            }
          ></Route>
        )}

        <Route
          path="/chat"
          element={
            <>
              {" "}
              <Header /> <ChatContainer/>{" "}
            </>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
