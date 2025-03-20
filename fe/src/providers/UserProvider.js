import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userInformation, setUserInformation] = useState(
    () => JSON.parse(localStorage.getItem("user")) || {}
  );

  useEffect(() => {
    if (userInformation)
      localStorage.setItem("user", JSON.stringify(userInformation));
  }, [userInformation]);

  return (
    <UserContext.Provider
      value={{ userInformation, setUserInformation }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
