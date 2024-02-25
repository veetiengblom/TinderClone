// Import necessary modules and components from React and react-cookie
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

// Functional component MatchesDisplay for rendering matched user profiles
const MatchesDisplay = ({ matches, setClickedUser }) => {
  const [matchedProfiles, setMatchesProfiles] = useState(null);
  const [cookies, setCookie, removeCookies] = useCookies(["user"]);

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
          <div className="imgContainer">
            <img
              className="profileImg"
              src={match?.url}
              alt={match?.firstName + "profile"}
            ></img>
          </div>
          <h3>{match?.firstName}</h3>
        </div>
      ))}
    </div>
  );
};

export default MatchesDisplay;
