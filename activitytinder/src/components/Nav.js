import logo from "../images/activityLogo.png";

const Nav = ({ minimal, setShowModal, showModal, setSignUp }) => {
  const handleClick = () => {
    setShowModal(true);
    setSignUp(false);
  };
  const authToken = false;
  return (
    <nav>
      <div className="logo-container">
        <img className="logo" src={logo} />
      </div>
      {!authToken && !minimal && (
        <button className="navBtn" onClick={handleClick} disabled={showModal}>
          Log in
        </button>
      )}
    </nav>
  );
};

export default Nav;
