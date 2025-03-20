import { useContext, useState, useEffect } from "react";
import { UserContext } from "../providers/UserProvider";
import api from "../api";

export default function useUser() {
  const userContext = useContext(UserContext);
  const { userInformation, setUserInformation } = userContext;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.getMe();
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleChangeUserInformation = (value) => {
    setUserInformation(value);
  };
  return [user, setUserInformation, handleChangeUserInformation];
}
