"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaGoogle,
} from "react-icons/fa";
import { useUser } from "../hook/useUser";
import api from "../home/lib/api";
import { GoogleLogin } from "@react-oauth/google";

const Register = () => {
  const router = useRouter();
  const { login, user } = useUser();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    number: "",
  });

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (loading) return;
    if (!user) return;

    if (user.role?.trim()?.toLowerCase() === "admin") {
      router.replace("/admin");
    } else {
      router.replace("/home");
    }
  }, [user, loading, router]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  // ==========================================
  // NORMAL REGISTER
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password ||
      !formData.number.trim()
    ) {
      setError("Fadlan buuxi dhammaan meelaha.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const { data } = await api.post("/api/user/register-user", formData);

      console.log("REGISTER RESPONSE:", data);

      setSuccess("Si guul leh ayaad u is-diiwaangelisay!");

      setTimeout(() => {
        router.replace("/LoginPage");
      }, 1000);
    } catch (error) {
      console.log("REGISTER ERROR:", error);
      console.log("STATUS:", error?.response?.status);
      console.log("DATA:", error?.response?.data);

      const message =
        error?.response?.data?.message ||
        error?.response?.data ||
        "Waxaa dhacay khalad. Fadlan isku day mar kale.";

      setError(
        typeof message === "string"
          ? message
          : "Waxaa dhacay khalad. Fadlan isku day mar kale.",
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // GOOGLE REGISTER
  // ==========================================

  const handleGoogleRegister = async (credentialResponse) => {
    if (googleLoading) return;

    setGoogleLoading(true);
    setError("");

    try {
      console.log("GOOGLE RESPONSE:", credentialResponse);

      const idToken = credentialResponse?.credential;

      if (!idToken) {
        throw new Error("Google ID token lama helin.");
      }

      const { data } = await api.post("/api/user/google-login", {
        idToken,
      });

      console.log("GOOGLE BACKEND RESPONSE:", data);

      // Save user + token
      await login(data);

      // Get user role
      const role = data?.user?.role?.trim()?.toLowerCase();

      console.log("GOOGLE USER ROLE:", role);

      // Navigate according to role
      if (role === "admin") {
        router.replace("/admin");
      } else {
        router.replace("/");
      }
    } catch (error) {
      console.log("GOOGLE LOGIN ERROR:", error);

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Google login ayaa fashilmay. Fadlan isku day mar kale.";

      setError(message);
    } finally {
      setGoogleLoading(false);
    }
  };
  return (
    <main className="min-h-screen bg-[#F8F7F4] px-4 py-10 sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-md items-center justify-center">
        <div className="w-full">
          {/* ================= HEADER ================= */}

          <div className="mb-8 text-center">
            {/* Logo */}

            <div className="mx-auto mb-5 flex h-[62px] w-[62px] items-center justify-center rounded-[18px]">
              {/* 
                Haddii aad logo leedahay:
                
                <Image
                  src="/logo.png"
                  alt="AWL Trading"
                  width={62}
                  height={62}
                />
              */}
            </div>

            <h1 className="text-[27px] font-bold tracking-tight text-[#222]">
              Create Account
            </h1>

            <p className="mt-2 text-sm leading-5 text-[#888]">
              Join AWL Trading and start shopping today.
            </p>
          </div>

          {/* ================= FORM ================= */}

          <form onSubmit={handleSubmit} className="w-full">
            {/* ================= NAME ================= */}

            <div className="mb-[17px]">
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-[#333]"
              >
                Full Name
              </label>

              <div className="flex h-[54px] items-center rounded-xl border border-[#E3E0DA] bg-white px-[15px] transition focus-within:border-[#C8A96E] focus-within:ring-2 focus-within:ring-[#C8A96E]/10">
                <FaUser size={17} className="shrink-0 text-[#888]" />

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="ml-3 w-full bg-transparent text-sm text-[#222] outline-none placeholder:text-[#999]"
                />
              </div>
            </div>

            {/* ================= EMAIL ================= */}

            <div className="mb-[17px]">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-[#333]"
              >
                Email
              </label>

              <div className="flex h-[54px] items-center rounded-xl border border-[#E3E0DA] bg-white px-[15px] transition focus-within:border-[#C8A96E] focus-within:ring-2 focus-within:ring-[#C8A96E]/10">
                <FaEnvelope size={16} className="shrink-0 text-[#888]" />

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="ml-3 w-full bg-transparent text-sm text-[#222] outline-none placeholder:text-[#999]"
                />
              </div>
            </div>

            {/* ================= PHONE ================= */}

            <div className="mb-[17px]">
              <label
                htmlFor="number"
                className="mb-2 block text-sm font-semibold text-[#333]"
              >
                Phone Number
              </label>

              <div className="flex h-[54px] items-center rounded-xl border border-[#E3E0DA] bg-white px-[15px] transition focus-within:border-[#C8A96E] focus-within:ring-2 focus-within:ring-[#C8A96E]/10">
                <FaPhone size={17} className="shrink-0 text-[#888]" />

                <input
                  id="number"
                  name="number"
                  type="tel"
                  placeholder="Enter your phone number"
                  autoComplete="tel"
                  value={formData.number}
                  onChange={handleChange}
                  className="ml-3 w-full bg-transparent text-sm text-[#222] outline-none placeholder:text-[#999]"
                />
              </div>
            </div>

            {/* ================= PASSWORD ================= */}

            <div className="mb-[17px]">
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-[#333]"
              >
                Password
              </label>

              <div className="flex h-[54px] items-center rounded-xl border border-[#E3E0DA] bg-white px-[15px] transition focus-within:border-[#C8A96E] focus-within:ring-2 focus-within:ring-[#C8A96E]/10">
                <FaLock size={19} className="shrink-0 text-[#888]" />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  className="ml-3 w-full bg-transparent text-sm text-[#222] outline-none placeholder:text-[#999]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-2 shrink-0 text-[#888] transition hover:text-[#333]"
                >
                  {showPassword ? (
                    <FaEyeSlash size={18} />
                  ) : (
                    <FaEye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* ================= ERROR ================= */}

            {error && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* ================= SUCCESS ================= */}

            {success && (
              <div className="mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600">
                {success}
              </div>
            )}

            {/* ================= REGISTER BUTTON ================= */}

            <button
              type="submit"
              disabled={loading || googleLoading}
              className={`mt-2 flex h-[54px] w-full items-center justify-center gap-3 rounded-xl bg-[#2D2417] text-base font-bold text-white transition hover:bg-[#403321] active:scale-[0.99] ${
                loading || googleLoading ? "cursor-not-allowed opacity-60" : ""
              }`}
            >
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <span>Create Account</span>
                  <FaArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          {/* ================= DIVIDER ================= */}

          <div className="my-6 flex items-center">
            <div className="h-px flex-1 bg-[#DDD]" />

            <span className="mx-3 text-xs text-[#999]">OR</span>

            <div className="h-px flex-1 bg-[#DDD]" />
          </div>

          {/* ================= GOOGLE ================= */}

          <div className="w-full">
            <GoogleLogin
              onSuccess={handleGoogleRegister}
              onError={() => {
                setError("Google login ayaa fashilmay.");
                setGoogleLoading(false);
              }}
              useOneTap={false}
            />
          </div>

          {/* ================= LOGIN ================= */}

          <div className="mt-6 flex justify-center text-sm">
            <span className="text-[#777]">Already have an account?</span>

            <button
              type="button"
              onClick={() => router.replace("/login")}
              className="ml-1 font-bold text-[#A27C3A] transition hover:text-[#805F2A]"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
