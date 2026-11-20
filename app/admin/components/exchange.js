"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export default function ExchangeRate() {
  const [rate, setRate] = useState("");
  const [inputRate, setInputRate] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const getExchangeRate = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `${API_URL}/api/exchange-rate`
      );

      const currentRate = response.data.rate;

      setRate(currentRate);
      setInputRate(currentRate);
    } catch (error) {
      console.error("Get exchange rate error:", error);

      setError(
        error?.response?.data?.message ||
          "Failed to load exchange rate."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getExchangeRate();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    const newRate = Number(inputRate);

    if (!newRate || newRate <= 0) {
      setError("Please enter a valid exchange rate.");
      return;
    }

    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${API_URL}/api/exchange-rate`,
        {
          rate: newRate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRate(response.data.rate);
      setInputRate(response.data.rate);

      setMessage("Exchange rate updated successfully.");
    } catch (error) {
      console.error("Update exchange rate error:", error);

      setError(
        error?.response?.data?.message ||
          "Failed to update exchange rate."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-2xl border border-[#E8E1D6] bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#2D2417]">
          Exchange Rate
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Set today's USD to Somali Shilling exchange rate.
        </p>
      </div>

      {loading ? (
        <div className="py-6 text-center text-sm text-gray-500">
          Loading exchange rate...
        </div>
      ) : (
        <>
          <div className="mb-6 rounded-xl bg-[#FAF8F5] p-4">
            <p className="text-sm text-gray-500">
              Current Rate
            </p>

            <p className="mt-1 text-2xl font-bold text-[#2D2417]">
              1 USD ={" "}
              {Number(rate || 0).toLocaleString()} SLSh
            </p>
          </div>

          <form onSubmit={handleUpdate}>
            <label className="mb-2 block text-sm font-semibold text-[#333]">
              Today's Rate
            </label>

            <div className="flex gap-3">
              <div className="flex flex-1 items-center rounded-xl border border-[#DDD] bg-white px-4">
                <span className="mr-2 text-sm font-semibold text-gray-500">
                  1 USD =
                </span>

                <input
                  type="number"
                  min="1"
                  step="1"
                  value={inputRate}
                  onChange={(e) =>
                    setInputRate(e.target.value)
                  }
                  className="w-full py-3 text-lg font-semibold text-[#2D2417] outline-none"
                  placeholder="8000"
                />

                <span className="ml-2 text-sm font-semibold text-gray-500">
                  SLSh
                </span>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-[#2D2417] px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? "Updating..." : "Update Rate"}
              </button>
            </div>
          </form>

          {message && (
            <p className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
              {message}
            </p>
          )}

          {error && (
            <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </p>
          )}
        </>
      )}
    </div>
  );
}