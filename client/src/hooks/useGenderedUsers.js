import { useEffect, useState } from "react";

export const useGenderedUsers = (user) => {
  const [genderedUsers, setGenderedUsers] = useState(undefined);

  useEffect(() => {
    const getGenderedUsers = async () => {
      try {
        const userGenderInterest = user.genderInterest;
        const userGenderIdentity = user.genderIdentity;
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

    if (user) {
      getGenderedUsers();
    }
  }, [user]);

  return genderedUsers;
};
