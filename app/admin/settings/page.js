'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  ShoppingBag,
  Power,
  User,
  Building2,
  Lock,
  Info,
  ChevronRight,
  Pencil,
  LogOut,
} from "lucide-react";

import useUsers from "../../hook/userUse";
import { useUser } from "../../hook/useUser";

export default function AdminSettings() {
  const router = useRouter();

  const { user, profileLoading, getProfile } = useUsers();
  const { logout } = useUser();

  const [notifications, setNotifications] = useState(true);
  const [orderAlerts, setOrderAlerts] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    getProfile();
  }, []);

  const userImage =
    user?.image || user?.avatar || user?.profileImage || user?.photo || null;

  const userName = user?.name || "User";
  const avatarLetter = userName.charAt(0).toUpperCase();

  const handleLogout = async () => {
    const confirmed = window.confirm("Are you sure you want to logout?");

    if (!confirmed) return;

    try {
      setLoggingOut(true);

      await logout();

      router.replace("/LoginPage");
    } catch (error) {
      console.error("Logout error:", error);

      alert("Failed to logout");
    } finally {
      setLoggingOut(false);
    }
  };

  const handleMenuPress = (title) => {
    if (title === "Store Control") {
      router.push("/admin/StoreControle");
      return;
    }

    if (title === "Edit Profile") {
      router.push("/admin/EditProfile");
      return;
    }

    if (title === "Security") {
      router.push("/admin/Security");
      return;
    }

    if (title === "Notifications") {
      router.push("/notification");
      return;
    }

    if (title === "Order Settings") {
      router.push("/admin/Orders");
      return;
    }

    if (title === "Store Information") {
      router.push("/admin");
      return;
    }

    if (title === "About") {
      alert("HEL SUUQ Admin\nVersion 1.0.0");
    }
  };

  const menuItems = [
    {
      title: "Store Control",
      subtitle: "Open or close HEL SUUQ",
      icon: Power,
    },
    {
      title: "Edit Profile",
      subtitle: "Update your name, email and profile",
      icon: User,
    },
    {
      title: "Notifications",
      subtitle: "Manage notification preferences",
      icon: Bell,
    },
    {
      title: "Order Settings",
      subtitle: "Manage your order preferences",
      icon: ShoppingBag,
    },
    {
      title: "Store Information",
      subtitle: "Store name, address and contact",
      icon: Building2,
    },
    {
      title: "Security",
      subtitle: "Password and account security",
      icon: Lock,
    },
    {
      title: "About",
      subtitle: "App information and version",
      icon: Info,
    },
  ];

  if (profileLoading) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#F7F7F7]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#E8E3DA] border-t-[#2D2417]" />

        <p className="mt-3 text-sm text-gray-500">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <div className="mx-auto w-full max-w-3xl px-4 py-5 sm:px-6 sm:py-8">
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#222]">Settings</h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage your admin account and store
          </p>
        </div>

        {/* PROFILE CARD */}
        <div className="mb-7 flex items-center rounded-2xl bg-white p-4 shadow-sm sm:p-5">
          {userImage ? (
            <img
              src={userImage}
              alt={userName}
              className="h-[68px] w-[68px] rounded-full object-cover"
            />
          ) : (
            <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-[#2D2417] text-2xl font-bold text-white">
              {avatarLetter}
            </div>
          )}

          <div className="ml-4 flex-1">
            <h2 className="text-lg font-bold text-[#222]">
              {user?.name || "Admin"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {user?.email || "No email"}
            </p>

            <span className="mt-2 inline-flex rounded-md bg-[#F1E5CF] px-2.5 py-1 text-[10px] font-bold text-[#8A6A32]">
              {(user?.role || "ADMIN").toUpperCase()}
            </span>
          </div>

          <button
            onClick={() => router.push("/admin/EditProfile")}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-[#333] transition hover:bg-gray-200"
          >
            <Pencil size={17} />
          </button>
        </div>

        {/* PREFERENCES */}
        <h3 className="mb-3 text-base font-bold text-[#333]">Preferences</h3>

        <div className="mb-7 overflow-hidden rounded-2xl bg-white shadow-sm">
          {/* NOTIFICATIONS */}
          <div className="flex items-center p-4">
            <div className="flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-[#F5F5F5]">
              <Bell size={19} className="text-[#333]" />
            </div>

            <div className="ml-3 flex-1">
              <h4 className="text-[15px] font-semibold text-[#222]">
                Notifications
              </h4>

              <p className="mt-1 text-xs text-gray-400">
                Receive admin notifications
              </p>
            </div>

            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative h-7 w-12 rounded-full transition ${
                notifications ? "bg-[#C8A96E]" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${
                  notifications ? "right-1" : "left-1"
                }`}
              />
            </button>
          </div>

          <div className="ml-[70px] h-px bg-gray-100" />

          {/* ORDER ALERTS */}
          <div className="flex items-center p-4">
            <div className="flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-[#F5F5F5]">
              <ShoppingBag size={18} className="text-[#333]" />
            </div>

            <div className="ml-3 flex-1">
              <h4 className="text-[15px] font-semibold text-[#222]">
                Order Alerts
              </h4>

              <p className="mt-1 text-xs text-gray-400">
                Get alerts for new orders
              </p>
            </div>

            <button
              onClick={() => setOrderAlerts(!orderAlerts)}
              className={`relative h-7 w-12 rounded-full transition ${
                orderAlerts ? "bg-[#C8A96E]" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${
                  orderAlerts ? "right-1" : "left-1"
                }`}
              />
            </button>
          </div>
        </div>

        {/* ACCOUNT & STORE */}
        <h3 className="mb-3 text-base font-bold text-[#333]">
          Account & Store
        </h3>

        <div className="mb-7 overflow-hidden rounded-2xl bg-white shadow-sm">
          {menuItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <div key={item.title}>
                <button
                  onClick={() => handleMenuPress(item.title)}
                  className="flex w-full items-center p-4 text-left transition hover:bg-gray-50"
                >
                  <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl bg-[#F5F5F5]">
                    <Icon size={18} className="text-[#333]" />
                  </div>

                  <div className="ml-3 flex-1">
                    <h4 className="text-[15px] font-semibold text-[#222]">
                      {item.title}
                    </h4>

                    <p className="mt-1 text-xs text-gray-400">
                      {item.subtitle}
                    </p>
                  </div>

                  <ChevronRight size={16} className="text-gray-400" />
                </button>

                {index !== menuItems.length - 1 && (
                  <div className="ml-[70px] h-px bg-gray-100" />
                )}
              </div>
            );
          })}
        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#FEECEC] font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-60"
        >
          {loggingOut ? (
            <>
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-red-200 border-t-red-600" />
              Logging out...
            </>
          ) : (
            <>
              <LogOut size={19} />
              Logout
            </>
          )}
        </button>

        {/* VERSION */}
        <p className="mt-5 text-center text-xs text-gray-400">
          HEL SUUQ Admin • Version 1.0.0
        </p>
      </div>
    </div>
  );
}
