// Import necessary modules from React
import { useEffect, useState } from "react";

// Custom hook useUser for fetching user data based on userId
export const useUser = (userId, iteration = 0) => {
  const [user, setUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  // Effect to fetch user data when userId or iteration changes
  useEffect(() => {
    const getUser = async () => {
      try {
        setIsLoading(true);

        // Send a GET request to retrieve user data based on userId
        const response = await fetch("/index/user", {
          method: "GET",
          headers: {
            params: userId,
          },
        });

        const data = await response.json();

        // Check if existingUser is defined in the response data
        if (data.existingUser === undefined) {
          return;
        }

        setUser(data.existingUser);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    // Check if userId exists before fetching user data
    if (userId) {
      getUser();
    }
  }, [userId, iteration]);

  // Return an object containing user data and loading status
  return { user, isLoading };
};
