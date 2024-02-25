// Import the logo image
import logo from "../images/activityLogo.png";

// Functional component Nav for rendering the navigation bar
const Nav = ({ minimal, setShowModal, showModal, setSignUp }) => {
  // Event handler to show the modal and set sign-up state to false
  const handleClick = () => {
    setShowModal(true);
    setSignUp(false);
  };

  // Placeholder for authentication status (authToken)
  const authToken = false;

  // Render the Nav component
  return (
    <nav>
      <div className="logo-container">
        <img className="logo" src={logo} alt="Logo" />
      </div>
      {!authToken && !minimal && (
        <button className="navBtn" onClick={handleClick} disabled={showModal}>
          Log in
        </button>
      )}
    </nav>
  );
};

// Export the Nav component as the default export
export default Nav;
