import { createContext, useEffect, useState } from "react";
import { getAccessToken, removeAccessToken, setAccessToken } from "../utils/localstorage";

import jwtDecode from "jwt-decode"; // : ใช้ในการถอดรหัส Token JWT เพื่อรับข้อมูลผู้ใช้.
import * as authService from "../api/auth-api";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [authUser, setAuthUser] = useState(getAccessToken() ? true : null);

  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        const res = await authService.fetchMe();
        setAuthUser(res.data.user);
      } catch (err) {
        removeAccessToken();
      }
    };

    if (getAccessToken()) {
      fetchAuthUser();
    }
  }, []);

  const register = async (input) => {
    const res = await authService.register(input);
    if (res?.data?.accessToken) {
      setAccessToken(res.data.accessToken);
      setAuthUser(jwtDecode(res.data.accessToken));
      return;
    }
    return res;
  };

  const login = async (input) => {
    const res = await authService.login(input);

    if (res.data) {
      setAccessToken(res.data.accessToken);
      setAuthUser(jwtDecode(res.data.accessToken));
      return;
    }
    return res;
  };

  const logout = () => {
    removeAccessToken();
    setAuthUser(null);
  };

  return <AuthContext.Provider value={{ authUser, register, login, logout }}>{children}</AuthContext.Provider>;
}
