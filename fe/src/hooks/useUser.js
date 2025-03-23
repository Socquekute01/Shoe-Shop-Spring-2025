import { useContext, useState, useEffect } from "react";
import { UserContext } from "../providers/UserProvider";
import api from "../api";

export default function useUser() {
  const userContext = useContext(UserContext);
  const { userInformation, setUserInformation } = userContext;

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       if (!userInformation || !userInformation?.id) {
  //         setUserInformation(null);
  //         return
  //       }
  //       const response = await api.getMe(userInformation?.id);
  //       setUserInformation(response.data);
  //     } catch (error) {
  //       console.error("Failed to fetch user:", error.message);
  //     }
  //   };

  //   fetchUser();
  // }, []);

  return [userInformation, setUserInformation];
}
