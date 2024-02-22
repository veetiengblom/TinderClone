// Import necessary modules from React
import { useEffect, useState } from "react";

// Custom hook useUser for fetching user data based on userId
export const useUser = (userId, iteration = 0) => {
  // State variables to store user data and loading status
  const [user, setUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  // Effect to fetch user data when userId or iteration changes
  useEffect(() => {
    // Async function to fetch user data
    const getUser = async () => {
      try {
        // Set loading to true before fetching data
        setIsLoading(true);

        // Send a GET request to retrieve user data based on userId
        const response = await fetch("/index/user", {
          method: "GET",
          headers: {
            // Include userId in the headers
            params: userId,
          },
        });

        // Parse the response data as JSON
        const data = await response.json();

        // Check if existingUser is defined in the response data
        if (data.existingUser === undefined) {
          return;
        }

        // Set the fetched user data in the state and set loading to false
        setUser(data.existingUser);
        setIsLoading(false);
      } catch (error) {
        console.log(error);

        // Set loading to false in case of an error
        setIsLoading(false);
      }
    };

    // Check if userId exists before fetching user data
    if (userId) {
      getUser();
    }
  }, [userId, iteration]); // Re-run the effect when userId or iteration changes

  // Return an object containing user data and loading status
  return { user, isLoading };
};
