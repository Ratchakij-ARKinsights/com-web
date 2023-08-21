import { createContext, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode'; // : ใช้ในการถอดรหัส Token JWT เพื่อรับข้อมูลผู้ใช้.

import * as authService from '../api/auth-api';
import { getAccessToken, removeAccessToken, setAccessToken } from '../utils/localstorage';

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
    const [authenticatedUser, setAuthenticatedUser] = useState(
        getAccessToken() ? true : null
    );

    useEffect(() => {
        const fetchAuthUser = async () => {
            try {
                const res = await authService.getMe();
                setAuthenticatedUser(res.data.user);
            } catch (err) {
                removeAccessToken();
            }
        };
        if (getAccessToken()) {
            fetchAuthUser();
        }
    }, [authenticatedUser]);

    const login = async (email, password) => {
        const res = await authService.login({ email, password });
        setAccessToken(res.data.accessToken);
        setAuthenticatedUser(jwtDecode(res.data.accessToken));
    };

    const logout = () => {
        removeAccessToken();
        setAuthenticatedUser(null);
    };

    return (
        <AuthContext.Provider value={{ authenticatedUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
