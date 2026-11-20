"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  ShoppingBag,
  Heart,
  LogOut,
  ChevronRight,
} from "lucide-react";

import { useUser } from "../../hook/useUser";

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useUser();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/login");
    } catch (error) {
      console.error("LOGOUT ERROR:", error);
    }
  };

  // User loading / not logged in
  if (!user) {
    return (
      <main className="min-h-screen bg-[#F8F7F4] px-4 py-10">
        <div className="mx-auto max-w-xl rounded-2xl border border-gray-200 bg-white p-8 text-center">
          <h1 className="text-xl font-bold text-[#2D2417]">
            Please Login
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            You need to login to view your profile.
          </p>

          <button
            type="button"
            onClick={() => router.replace("/login")}
            className="mt-6 rounded-xl bg-[#2D2417] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#403321]"
          >
            Login
          </button>
        </div>
      </main>
    );
  }

  const name = user?.name || "Customer";
  const email = user?.email || "No email";
  const phone = user?.number || user?.phone || "No phone";

  // First letter for avatar
  const avatarLetter = name.charAt(0).toUpperCase();

  return (
    <main className="min-h-screen bg-[#F8F7F4] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-xl">
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#2D2417]">
            My Profile
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage your account
          </p>
        </div>

        {/* PROFILE CARD */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            {/* AVATAR */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#F4EEE4] text-2xl font-bold text-[#A4865A]">
              {avatarLetter}
            </div>

            {/* NAME */}
            <div className="min-w-0">
              <h2 className="truncate text-lg font-bold text-[#222]">
                {name}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Customer
              </p>
            </div>
          </div>

          {/* USER INFORMATION */}
          <div className="mt-6 space-y-3">
            {/* EMAIL */}
            <div className="flex items-center gap-3 rounded-xl bg-[#F8F8F8] px-4 py-3">
              <Mail
                size={19}
                className="shrink-0 text-[#A4865A]"
              />

              <div className="min-w-0">
                <p className="text-xs text-gray-400">
                  Email
                </p>

                <p className="truncate text-sm font-semibold text-[#333]">
                  {email}
                </p>
              </div>
            </div>

            {/* PHONE */}
            <div className="flex items-center gap-3 rounded-xl bg-[#F8F8F8] px-4 py-3">
              <Phone
                size={19}
                className="shrink-0 text-[#A4865A]"
              />

              <div className="min-w-0">
                <p className="text-xs text-gray-400">
                  Phone
                </p>

                <p className="text-sm font-semibold text-[#333]">
                  {phone}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* MENU */}
        <div className="mt-5 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* ORDERS */}
          <button
            type="button"
            onClick={() => router.push("/orders")}
            className="flex w-full items-center gap-4 border-b border-gray-100 px-5 py-4 text-left transition hover:bg-gray-50"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4EEE4]">
              <ShoppingBag
                size={20}
                className="text-[#A4865A]"
              />
            </div>

            <div className="flex-1">
              <p className="text-sm font-bold text-[#333]">
                My Orders
              </p>

              <p className="mt-0.5 text-xs text-gray-500">
                View your orders
              </p>
            </div>

            <ChevronRight
              size={19}
              className="text-gray-400"
            />
          </button>

          {/* FAVORITES */}
          <button
            type="button"
            onClick={() => router.push("/favorites")}
            className="flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-gray-50"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50">
              <Heart
                size={20}
                className="text-red-500"
              />
            </div>

            <div className="flex-1">
              <p className="text-sm font-bold text-[#333]">
                Favorites
              </p>

              <p className="mt-0.5 text-xs text-gray-500">
                Your favorite products
              </p>
            </div>

            <ChevronRight
              size={19}
              className="text-gray-400"
            />
          </button>
        </div>

        {/* LOGOUT */}
        <button
          type="button"
          onClick={handleLogout}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-red-200 bg-white px-5 py-4 text-sm font-bold text-red-500 transition hover:bg-red-50"
        >
          <LogOut size={19} />
          Logout
        </button>
      </div>
    </main>
  );
}
