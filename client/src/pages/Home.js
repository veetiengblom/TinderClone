// Import necessary modules and components
import Nav from "../components/Nav";
import AuthModal from "../components/AuthModal";
import { useState } from "react";

// Home component
const Home = () => {
  // State variables for controlling the visibility of the modal and sign-up state
  const [showModal, setShowModal] = useState(false);
  const [signUp, setSignUp] = useState(true);

  // Dummy authentication token
  const authToken = false;

  // Event handler for button click to show the modal
  const handleClick = () => {
    setShowModal(true);
    setSignUp(true);
  };

  // JSX structure of the Home component
  return (
    <div className="overlay">
      {/* Render the Nav component with required props */}
      <Nav
        minimal={false}
        setShowModal={setShowModal}
        showModal={showModal}
        setSignUp={setSignUp}
      />
      <div className="home">
        <h1 className="primaryTitle">Activity Swipe</h1>
        {/* Button to toggle the modal visibility */}
        <button className="primaryBtn" onClick={handleClick}>
          {authToken ? "Sign Out" : "Create Account"}
        </button>

        {/* Render the AuthModal component when showModal is true */}
        {showModal && <AuthModal setShowModal={setShowModal} signUp={signUp} />}
      </div>
    </div>
  );
};

// Export the Home component
export default Home;
