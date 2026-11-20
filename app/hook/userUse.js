import useCrud from "./useCrud";
import userService from "../services/user";
import { useState } from "react";

export default function useUsers() {
  const crud = useCrud(userService);

  const [user, setUser] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState(null);

  // =========================
  // GET CURRENT PROFILE
  // =========================
  const getProfile = async () => {
    try {
      setProfileLoading(true);
      setProfileError(null);

      const data = await userService.getProfile();

      console.log("PROFILE RESPONSE:", JSON.stringify(data, null, 2));

      const currentUser = data?.user || data?.data || data;

      setUser(currentUser);

      return currentUser;
    } catch (error) {
      console.error("Get profile error:", error);
      setProfileError(error);
      throw error;
    } finally {
      setProfileLoading(false);
    }
  };

  // =========================
  // UPDATE CURRENT PROFILE
  // =========================
  const updateProfile = async (data) => {
    try {
      setProfileLoading(true);
      setProfileError(null);

      const response = await userService.updateProfile(data);

      console.log(
        "UPDATE PROFILE RESPONSE:",
        JSON.stringify(response, null, 2),
      );

      const updatedUser = response?.user || response?.data || response;

      setUser(updatedUser);

      return updatedUser;
    } catch (error) {
      console.error("Update profile error:", error);
      setProfileError(error);
      throw error;
    } finally {
      setProfileLoading(false);
    }
  };

  return {
    ...crud,

    // Profile
    user,
    setUser,
    getProfile,
    updateProfile,

    profileLoading,
    profileError,
  };
}
