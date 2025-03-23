import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { decodeJWT } from "../utils/jwtUtils";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userInformation, setUserInformation] = useState(() => {
    // Khôi phục trạng thái từ localStorage khi khởi động
    const savedData = localStorage.getItem("userData");
    return savedData ? JSON.parse(savedData) : null;
  });

  useEffect(() => {
    if (userInformation?.accessToken) {
      // Giải mã token để lấy thông tin
      const decodedToken = decodeJWT(userInformation.accessToken);

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${userInformation.accessToken}`;
      localStorage.setItem(
        "userData",
        JSON.stringify({
          ...userInformation,
          decoded: decodedToken, // Lưu thêm thông tin giải mã
        })
      );

      localStorage.setItem("accessToken", userInformation?.accessToken)

      // Cập nhật thông tin từ token nếu cần
      if (decodedToken && !userInformation.username) {
        setUserInformation((prev) => ({
          ...prev,
          userName: decodedToken.sub,
          exp: decodedToken.exp,
        }));
      }
    } else {
      setUserInformation( () => {
        const savedData = localStorage.getItem("userData");
        return savedData ? JSON.parse(savedData) : null;
      })
    }
  }, [userInformation]);

  useEffect(() => {
    const verifyUserData = () => {
      if (userInformation) {
        const requiredFields = ["userName", "accessToken"];
        const isValid = requiredFields.every((field) => userInformation[field]);

        if (!isValid) {
          localStorage.removeItem("userData");
          setUserInformation(null);
        }
      }
    };

    verifyUserData();
  }, [userInformation]);

  return (
    <UserContext.Provider value={{ userInformation, setUserInformation }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
