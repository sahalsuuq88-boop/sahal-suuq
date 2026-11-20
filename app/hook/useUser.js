"use client";

import React, {
  useContext,
  useState,
  createContext,
  useEffect,
  useRef,
} from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  // =========================
  // LOGOUT
  // =========================
  const logOut = () => {
    console.log("LOGOUT STARTED");

    try {
      // Clear all authentication data
      localStorage.removeItem("user");
      localStorage.removeItem("expirationTime");
      localStorage.removeItem("token");

      // Clear React state
      setUser(null);

      console.log("LOGOUT SUCCESS");
      console.log("TOKEN AFTER LOGOUT:", localStorage.getItem("token"));
      console.log("USER AFTER LOGOUT:", localStorage.getItem("user"));
    } catch (error) {
      console.error("LOGOUT ERROR:", error);
      throw error;
    }
  };

  // =========================
  // LOAD STORED USER
  // =========================
  useEffect(() => {
    if (initialized.current) return;

    initialized.current = true;

    console.log("USER PROVIDER STARTED");

    try {
      const storedUser = localStorage.getItem("user");
      const expirationTime = localStorage.getItem("expirationTime");

      console.log("STORED USER:", storedUser);
      console.log("EXPIRATION:", expirationTime);

      if (storedUser && expirationTime) {
        const currentTime = Date.now();
        const expiresAt = parseInt(expirationTime, 10);

        if (currentTime < expiresAt) {
          const parsedUser = JSON.parse(storedUser);

          console.log("VALID USER:", parsedUser);

          setUser(parsedUser);
        } else {
          console.log("USER SESSION EXPIRED");

          localStorage.removeItem("user");
          localStorage.removeItem("expirationTime");
          localStorage.removeItem("token");

          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("LOAD USER ERROR:", error);

      localStorage.removeItem("user");
      localStorage.removeItem("expirationTime");
      localStorage.removeItem("token");

      setUser(null);
    } finally {
      console.log("SETTING LOADING FALSE");
      setLoading(false);
    }
  }, []);

  // =========================
  // LOGIN
  // =========================
  const login = (data) => {
    try {
      console.log("LOGIN DATA:", data);

      const userData = data?.user || data?.data || data;

      const token =
        data?.token ||
        data?.accessToken ||
        null;

      const expiresIn =
        Number(data?.expiresIn) ||
        60 * 60 * 24 * 7;

      const expirationTime =
        Date.now() + expiresIn * 1000;

      localStorage.setItem(
        "user",
        JSON.stringify(userData)
      );

      localStorage.setItem(
        "expirationTime",
        expirationTime.toString()
      );

      if (token) {
        localStorage.setItem("token", token);
      }

      setUser(userData);

      console.log("USER SAVED:", userData);
      console.log("TOKEN SAVED:", !!token);
      console.log(
        "EXPIRES:",
        new Date(expirationTime)
      );
    } catch (error) {
      console.error(
        "LOGIN STORAGE ERROR:",
        error
      );
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        login,
        logOut,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error(
      "useUser must be used inside UserProvider"
    );
  }

  return context;
};

export default UserContext;
