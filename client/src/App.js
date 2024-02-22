// Importing necessary components, hooks, and routing elements from dependencies
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import OnBoarding from "./pages/OnBoarding";
import Settings from "./pages/Settings";
import DashboardHeader from "./components/DashboardHeader";
import Matches from "./pages/Matches";
import { useCookies } from "react-cookie";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// App component responsible for setting up the application routing
const App = () => {
  // Retrieving cookies using the useCookies hook
  const [cookies, setCookie, removeCookies] = useCookies(["user"]);

  // Extracting authentication token from cookies
  const authToken = cookies.AuthToken;

  // Rendering the application using BrowserRouter and Routes
  return (
    <BrowserRouter>
      <Routes>
        {/* Home route, accessible to all users */}
        <Route path="/" element={<Home />} />

        {/* OnBoarding route, accessible only when an authentication token is present */}
        {authToken && <Route path="/onboarding" element={<OnBoarding />} />}

        {/* Dashboard route, accessible only when an authentication token is present */}
        {authToken && (
          <Route
            path="/dashboard"
            element={
              <>
                {" "}
                {/* DashboardHeader component for navigation header */}
                <DashboardHeader />
                {/* Dashboard component for main dashboard view */}
                <Dashboard />{" "}
              </>
            }
          />
        )}

        {/* Matches route, accessible only when an authentication token is present */}
        {authToken && (
          <Route
            path="/matches"
            element={
              <>
                {/* DashboardHeader component for navigation header */}
                <DashboardHeader />
                {/* Matches component for displaying matched users */}
                <Matches />{" "}
              </>
            }
          />
        )}

        {/* Settings route, accessible only when an authentication token is present */}
        {authToken && (
          <Route
            path="/settings"
            element={
              <>
                {" "}
                {/* DashboardHeader component for navigation header */}
                <DashboardHeader />
                {/* Settings component for user settings */}
                <Settings />{" "}
              </>
            }
          />
        )}
      </Routes>
    </BrowserRouter>
  );
};

// Exporting the App component as the default export
export default App;
