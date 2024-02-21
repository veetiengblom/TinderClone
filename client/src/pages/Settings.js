import SettingsModal from "../components/SettingsModal";
import { useState } from "react";

const Settings = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  return (
    <div className="settings">
      <div>
        <button className="primaryBtn" onClick={handleClick}>
          Update profile info
        </button>
        <h1>Settings</h1>
        {showModal && <SettingsModal setShowModal={setShowModal} />}
      </div>
    </div>
  );
};

export default Settings;
