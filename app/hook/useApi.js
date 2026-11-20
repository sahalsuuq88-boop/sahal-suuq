"use client";

import { useState } from "react";

export default function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async (callback) => {
    setLoading(true);
    setError(null);

    try {
      const response = await callback();

      return response;

    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Something went wrong";

      setError(message);

      throw err;

    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    request,
  };
}