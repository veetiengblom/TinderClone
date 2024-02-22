// Import necessary modules from React
import { useEffect, useState } from "react";

// Custom hook useGenderedUsers for fetching gendered users based on user's gender identity and interest
export const useGenderedUsers = (user) => {
  // State variable to store fetched gendered users
  const [genderedUsers, setGenderedUsers] = useState(undefined);

  // Effect to fetch gendered users when the user prop changes
  useEffect(() => {
    // Async function to fetch gendered users
    const getGenderedUsers = async () => {
      try {
        // Extract user's gender interest and gender identity from the user prop
        const userGenderInterest = user.genderInterest;
        const userGenderIdentity = user.genderIdentity;

        // Send a GET request to retrieve gendered users based on the user's gender interest and identity
        const response = await fetch("/index/genderedUsers", {
          method: "GET",
          headers: {
            // Include parameters in the headers
            params: JSON.stringify({
              userGenderInterest: userGenderInterest,
              userGenderIdentity: userGenderIdentity,
            }),
          },
        });

        // Parse the response data as JSON
        const data = await response.json();

        // Set the fetched gendered users in the state
        setGenderedUsers(data);
      } catch (error) {
        console.log(error);
      }
    };

    // Check if the user prop exists before fetching gendered users
    if (user) {
      getGenderedUsers();
    }
  }, [user]); // Re-run the effect when the user prop changes

  // Return the fetched gendered users
  return genderedUsers;
};
