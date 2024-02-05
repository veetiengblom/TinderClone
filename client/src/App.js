import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import OnBoarding from "./pages/OnBoarding";

import {
  Route,
  BrowserRouter as Router,
  Routes,
  Ruote,
} from "react-router-dom";
import ChatContainer from "./components/ChatContainer";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/onboarding" element={<OnBoarding />}></Route>
        <Route path="/chat" element={<ChatContainer />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
