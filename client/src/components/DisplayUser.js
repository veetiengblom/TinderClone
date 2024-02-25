// Import the TinderCard component for swipe functionality
import TinderCard from "react-tinder-card";

// Functional component DisplayUser for rendering user information and TinderCard
const DisplayUser = ({ user }) => {
  // Render the DisplayUser component
  return (
    <div className="displayUser">
      <div className="userProfile">
        <h2>User Profile</h2>
        <div className="userInfo">
          <strong className="infoLabel">First Name:</strong> {user.firstName}
        </div>
        <div className="userInfo">
          <strong className="infoLabel">Date of Birth:</strong> {user.dobDay}/
          {user.dobMonth}/{user.dobYear}
        </div>
        <div className="userInfo">
          <strong className="infoLabel">Show Gender In Profile:</strong>{" "}
          {user.showGender ? "Yes" : "No"}
        </div>
        <div className="userInfo">
          <strong className="infoLabel">Gender Identity:</strong>{" "}
          {user.genderIdentity}
        </div>
        <div className="userInfo">
          <strong className="infoLabel">Gender Interest:</strong>{" "}
          {user.genderInterest}
        </div>
        <div className="userInfo">
          <strong className="infoLabel">About:</strong> {user.about}
        </div>
      </div>

      <div className="cardContainer">
        <TinderCard className="swipe" key={user.firstName}>
          <div
            className="card"
            style={{
              backgroundImage: "url(" + user.url + ")",
            }}
          ></div>
        </TinderCard>
      </div>
    </div>
  );
};

export default DisplayUser;
