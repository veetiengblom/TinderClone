// Importing necessary components and hooks from React and dependencies
import SettingsModal from "../components/SettingsModal";
import DisplayUser from "../components/DisplayUser";
import { useUser } from "../hooks/useUser";
import { useState } from "react";
import { useCookies } from "react-cookie";

// Settings component responsible for displaying user settings
const Settings = () => {
  // Retrieving user cookies using the useCookies hook
  const [cookies, setCookie, removeCookies] = useCookies(["user"]);

  // State to manage the visibility of the settings modal
  const [showModal, setShowModal] = useState(false);

  // Extracting userId from cookies
  const userId = cookies.UserId;

  // Fetching user data using the useUser custom hook
  const { user } = useUser(userId);

  // Function to handle the click event on the "Update profile" button
  const handleClick = () => {
    setShowModal(true);
  };

  // Rendering the Settings component JSX
  return (
    <>
      {/* Rendering the settings page only if user data is available */}
      {user && (
        <div className="settings">
          {/* Rendering the SettingsModal component when showModal state is true */}
          {showModal && <SettingsModal setShowModal={setShowModal} />}

          {/* Rendering the DisplayUser component when showModal state is false */}
          {!showModal && <DisplayUser user={user} />}

          {/* Button to trigger the display of the SettingsModal */}
          <div className="updateProfileBtn">
            <button className="primaryBtn" onClick={handleClick}>
              Update profile
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// Exporting the Settings component as the default export
export default Settings;
