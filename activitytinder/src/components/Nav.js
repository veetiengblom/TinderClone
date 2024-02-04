import logo from "../images/activityLogo.png";

const Nav = ({ authToken, setShowModal, showModal, setSignUp }) => {
  const handleClick = () => {
    setShowModal(true);
    setSignUp(false)
  };
  return (
    <nav>
      <div className="logo-container">
        <img className="logo" src={logo} />
      </div>
      {!authToken && (
        <button className="navBtn" onClick={handleClick} disabled={showModal}>
          Log in
        </button>
      )}
    </nav>
  );
};

export default Nav;
