import React, { createContext, useCallback, useEffect, useState } from "react";
import { api } from "./api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Check auth (used on app start)
  const checkAuth = useCallback(async () => {
    setLoading(true);
    const { ok, data } = await api("/user/check-auth");
    if (ok && data?.userName) {
      setIsLoggedIn(true);
      setUser(data.userName);
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
    setLoading(false);
    return { ok, data };
  }, []);

  // Login function
  const login = useCallback(async (email, password) => {
    setLoading(true);
    const { ok, data } = await api("/user/login", {
      method: "POST",
      body: { email, password },
    });

    if (ok) {
      // after successful login, refresh user data
      await checkAuth();
    }

    setLoading(false);
    return { ok, data };
  }, [checkAuth]);

  // Logout function
  const logout = useCallback(async () => {
    setLoading(true);
    const { ok } = await api("/user/logout");
    if (ok) {
      setIsLoggedIn(false);
      setUser(null);
    }
    setLoading(false);
    return ok;
  }, []);

  useEffect(() => {
    // run once on app mount
    checkAuth();
  }, [checkAuth]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, loading, checkAuth, login, logout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
