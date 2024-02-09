import { useState, useEffect } from "react";

const MatchesDisplay = ({ matches, setClickedUser }) => {
  const [matchedProfiles, setMachesProfiles] = useState(null);

  const matchedUserId = matches.map(({ userId }) => userId);

  const getMatches = async () => {
    try {
      const response = await fetch("/index/matchedUsers", {
        method: "GET",
        headers: {
          params: JSON.stringify(matchedUserId),
        },
      });
      const data = await response.json();
      setMachesProfiles(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMatches();
  }, []);

  return (
    <div className="matchesDisplay">
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
              atl={match?.firstName + "profile"}
            ></img>
          </div>
          <h3>{match?.firstName}</h3>
        </div>
      ))}
    </div>
  );
};

export default MatchesDisplay;
