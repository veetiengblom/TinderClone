import { useEffect, useState } from "react";

export const useUser = (userId, iteration = 0) => {
  const [user, setUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/index/user", {
          method: "GET",
          headers: {
            params: userId,
          },
        });

        const data = await response.json();
        if (data.existingUser === undefined) {
          return;
        }

        setUser(data.existingUser);
        setIsLoading(false)

      } catch (error) {
        console.log(error);
        setIsLoading(false)
      }
    };

    if (userId) {
      getUser();
    }
  }, [userId, iteration]);

  return { user, isLoading };
};
