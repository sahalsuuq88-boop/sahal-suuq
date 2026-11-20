"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  // =========================
  // LOGIN
  // =========================
  const login = async (userData) => {
    try {
      const { user, token } = userData;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);

      return user;
    } catch (error) {
      console.log("Login error:", error);
      throw error;
    }
  };

  // =========================
  // REGISTER
  // =========================
  const register = async (userData) => {
    try {
      const { user, token } = userData;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);

      return user;
    } catch (error) {
      console.log("Register error:", error);
      throw error;
    }
  };

  // =========================
  // LOGOUT
  // =========================
  const logout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setUser(null);

      router.push("/");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  // =========================
  // GET SAVED USER
  // =========================
  const getProfile = () => {
    try {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);

        console.log("👤 SAVED USER:", parsedUser);
        console.log("👤 ROLE:", parsedUser?.role);

        setUser(parsedUser);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log("Get profile error:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // CHECK AUTH ON APP START
  // =========================
  useEffect(() => {
    getProfile();
  }, []);

  // =========================
  // CONTEXT
  // =========================
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// =========================
// CUSTOM HOOK
// =========================
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};