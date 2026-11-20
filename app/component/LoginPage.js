"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { useUser } from "../hook/useUser";
import api from "../home/lib/api";
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const { login, user, loading: userLoading } = useUser();
  const router = useRouter();

  // =====================================================
  // AUTH NAVIGATION
  // =====================================================

  useEffect(() => {
    if (userLoading) return;
    if (!user) return;

    if (user.role?.trim()?.toLowerCase() === "admin") {
      router.replace("/admin");
    } else {
      router.replace("/home");
    }
  }, [user, userLoading, router]);

  // =====================================================
  // NORMAL LOGIN
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.email || !formData.password) {
      setError("Fadlan geli email iyo password.");
      return;
    }

    setLoading(true);

    try {
      const { data } = await api.post("/api/user/login-user", formData);

      console.log("LOGIN RESPONSE:", data);

      await login(data);

      // Navigation-ka useEffect ayaa qabanaya.
    } catch (error) {
      console.log("STATUS:", error?.response?.status);
      console.log("DATA:", error?.response?.data);
      console.log("LOGIN ERROR:", error);

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

  // =====================================================
  // GOOGLE LOGIN
  // =====================================================

  const handleGoogleLogin = async (credentialResponse) => {
    if (googleLoading) return;

    setGoogleLoading(true);
    setError("");

    try {
      console.log("GOOGLE RESPONSE:", credentialResponse);

      const idToken = credentialResponse.credential;

      if (!idToken) {
        throw new Error("Google ID token lama helin.");
      }

      const { data } = await api.post("/api/user/google-login", {
        idToken,
      });

      console.log("GOOGLE BACKEND RESPONSE:", data);

      await login(data);

      // useEffect-kaaga ayaa navigation-ka qabanaya
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

  // =====================================================
  // LOADING
  // =====================================================

  if (loading || userLoading) {
    return (
      <div className="min-h-screen bg-[#F8F7F4] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="h-10 w-10 rounded-full border-4 border-[#E7DFD1] border-t-[#C8A96E] animate-spin" />

          <p className="mt-4 text-sm text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <main className="min-h-screen bg-[#F8F7F4] flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-md">
        {/* =========================
            HEADER
        ========================= */}

        <div className="text-center mb-10">
          {/* Logo */}
          {/* <div className="mx-auto mb-5 flex h-[70px] w-[70px] items-center justify-center rounded-[20px] bg-[#C8A96E] shadow-sm">
            <span className="text-[22px] font-extrabold text-white">
              AWL
            </span>
          </div> */}

          <h1 className="text-[28px] font-bold text-[#222]">Welcome back!</h1>

          <p className="mt-2 text-sm text-[#888]">
            Login to continue shopping with us.
          </p>
        </div>

        {/* =========================
            FORM CARD
        ========================= */}

        <div className="w-full">
          {/* ERROR */}
          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* EMAIL */}

            <div className="mb-5">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-[#333]"
              >
                Email
              </label>

              <div className="flex h-[54px] items-center rounded-xl border border-[#E3E0DA] bg-white px-4 transition focus-within:border-[#C8A96E] focus-within:ring-2 focus-within:ring-[#C8A96E]/10">
                <Mail size={18} className="shrink-0 text-[#888]" />

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  className="ml-3 w-full border-none bg-transparent text-sm text-[#222] outline-none placeholder:text-[#999]"
                />
              </div>
            </div>

            {/* PASSWORD */}

            <div className="mb-5">
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-[#333]"
                >
                  Password
                </label>

                {/* <button
                  type="button"
                  onClick={() =>
                    router.push("/ForgotPassword")
                  }
                  className="text-xs font-semibold text-[#A27C3A] transition hover:text-[#805F2C]"
                >
                  Forgot Password?
                </button> */}
              </div>

              <div className="flex h-[54px] items-center rounded-xl border border-[#E3E0DA] bg-white px-4 transition focus-within:border-[#C8A96E] focus-within:ring-2 focus-within:ring-[#C8A96E]/10">
                <Lock size={19} className="shrink-0 text-[#888]" />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                  className="ml-3 w-full border-none bg-transparent text-sm text-[#222] outline-none placeholder:text-[#999]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-2 text-[#888] hover:text-[#555]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* LOGIN BUTTON */}

            <button
              type="submit"
              disabled={loading || googleLoading}
              className="mt-1 flex h-[54px] w-full items-center justify-center gap-3 rounded-xl bg-[#2D2417] text-base font-bold text-white transition hover:bg-[#3A2F20] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <span>Login</span>

                  <ArrowRight size={17} />
                </>
              )}
            </button>
          </form>

          {/* =========================
              DIVIDER
          ========================= */}

          <div className="my-7 flex items-center">
            <div className="h-px flex-1 bg-[#DDD]" />

            <span className="mx-3 text-xs text-[#999]">OR</span>

            <div className="h-px flex-1 bg-[#DDD]" />
          </div>

          {/* =========================
              GOOGLE BUTTON
          ========================= */}

          <div className="w-full">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => {
                setError("Google login ayaa fashilmay.");
                setGoogleLoading(false);
              }}
              useOneTap={false}
            />
          </div>

          {/* =========================
              REGISTER
          ========================= */}

          <div className="mt-7 flex items-center justify-center text-sm">
            <span className="text-[#777]">Don't have an account?</span>

            <button
              type="button"
              onClick={() => router.push("/register")}
              className="ml-1 font-bold text-[#A27C3A] hover:text-[#805F2C]"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
