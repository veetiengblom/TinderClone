// Import necessary modules from React
import { useEffect, useState } from "react";

// Custom hook useGenderedUsers for fetching gendered users based on user's gender identity and interest
export const useGenderedUsers = (user) => {
  const [genderedUsers, setGenderedUsers] = useState(undefined);

  // Effect to fetch gendered users when the user prop changes
  useEffect(() => {
    const getGenderedUsers = async () => {
      try {
        const userGenderInterest = user.genderInterest;
        const userGenderIdentity = user.genderIdentity;

        // Send a GET request to retrieve gendered users based on the user's gender interest and identity
        const response = await fetch("/index/genderedUsers", {
          method: "GET",
          headers: {
            params: JSON.stringify({
              userGenderInterest: userGenderInterest,
              userGenderIdentity: userGenderIdentity,
            }),
          },
        });
        const data = await response.json();

        setGenderedUsers(data);
      } catch (error) {
        console.log(error);
      }
    };

    // Check if the user prop exists before fetching gendered users
    if (user) {
      getGenderedUsers();
    }
  }, [user]);

  // Return the fetched gendered users
  return genderedUsers;
};
