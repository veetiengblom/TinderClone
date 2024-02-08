import Nav from "../components/Nav";
import AuthModal from "../components/AuthModal";

import { useState } from "react";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [signUp, setSignUp] = useState(true);
  const authToken = false;

  const handleClick = () => {
    console.log("clicked");
    setShowModal(true);
    setSignUp(true);
  };
  return (
    <div className="overlay">
      <Nav
        minimal={false}
        setShowModal={setShowModal}
        showModal={showModal}
        setSignUp={setSignUp}
      />
      <div className="home">
        <h1 className="primaryTitle">Swipe Right</h1>
        <button className="primaryBtn" onClick={handleClick}>
          {authToken ? "signout" : "Create Account"}
        </button>

        {showModal && (
          <AuthModal
            setShowModal={setShowModal}
            signUp={signUp}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
