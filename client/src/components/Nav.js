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
      {/* Logo container */}
      <div className="logo-container">
        {/* Display the logo image */}
        <img className="logo" src={logo} alt="Logo" />
      </div>

      {/* Render login button if not authenticated and not in minimal mode */}
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
