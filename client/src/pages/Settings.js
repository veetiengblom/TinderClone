import SettingsModal from "../components/SettingsModal";
import DisplayUser from "../components/DisplayUser";
import { useUser } from "../hooks/useUser";
import { useState } from "react";
import { useCookies } from "react-cookie";

const Settings = () => {
  const [cookies, setCookie, removeCookies] = useCookies(["user"]);
  const [showModal, setShowModal] = useState(false);

  const userId = cookies.UserId;
  const { user } = useUser(userId);

  const handleClick = () => {
    setShowModal(true);
  };

  return (
    <>
      {user && (
        <div className="settings">
          {showModal && <SettingsModal setShowModal={setShowModal} />}
          {!showModal && <DisplayUser user={user} />}
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

export default Settings;
