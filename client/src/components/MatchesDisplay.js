// Import necessary modules and components from React and react-cookie
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

// Functional component MatchesDisplay for rendering matched user profiles
const MatchesDisplay = ({ matches, setClickedUser }) => {
  // State variable to store matched user profiles
  const [matchedProfiles, setMatchesProfiles] = useState(null);

  // Hook to manage cookies
  const [cookies, setCookie, removeCookies] = useCookies(["user"]);

  // Extract user ID from cookies
  const userId = cookies.UserId;

  // Extract user IDs from the provided matches
  const matchedUserIds = matches.map(({ userId }) => userId);

  // Function to fetch and set matched user profiles
  const getMatches = async () => {
    try {
      const response = await fetch("/index/matchedUsers", {
        method: "GET",
        headers: {
          params: JSON.stringify({ matchedUserIds, userId }),
        },
      });
      const data = await response.json();
      setMatchesProfiles(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch matched user profiles when the component mounts
  useEffect(() => {
    getMatches();
  }, []);

  // Render the MatchesDisplay component
  return (
    <div className="matchesDisplay">
      {/* Map through matched profiles and render a card for each */}
      {matchedProfiles?.map((match) => (
        <div
          key={match.userId}
          className="matchCard"
          onClick={() => setClickedUser(match)}
        >
          {/* Display the user's profile image */}
          <div className="imgContainer">
            <img
              className="profileImg"
              src={match?.url}
              alt={match?.firstName + "profile"}
            ></img>
          </div>
          {/* Display the user's first name */}
          <h3>{match?.firstName}</h3>
        </div>
      ))}
    </div>
  );
};

// Export the MatchesDisplay component as the default export
export default MatchesDisplay;
