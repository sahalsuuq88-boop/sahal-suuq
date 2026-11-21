"use client";

import React, { useCallback, useState } from "react";
import Link from "next/link";
import {
  Bell,
  ChevronDown,
  ChevronRight,
  LogOut,
  Menu,
  Package,
  Settings,
  ShoppingCart,
  Users,
  Folder,
  LayoutDashboard,
  X,
} from "lucide-react";

import { useRouter } from "next/navigation";
import Logo from "../../home/component/logo";
import DarkLogo from "../../home/component/dackLogo";
import useNotifications from "../../hook/useNotification";
import { useUser } from "../../hook/useUser";
import { useAdminOrdersSocket } from "../../hook/useAdminOrdersSocket";

const menus = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "Categories",
    href: "/admin/categores",
    icon: Folder,
  },
  {
    title: "Customers",
    href: "/admin/customers",
    icon: Users,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function Navbar() {
  const router = useRouter();

  const { user, logOut } = useUser();

  const {
    notifications = [],
    unreadCount = 0,
    loading,
    reload,
    markAsRead,
  } = useNotifications();

  const [menuVisible, setMenuVisible] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [socketBonusCount, setSocketBonusCount] = useState(0);

  React.useEffect(() => {
    reload?.();
  }, [reload]);

  const isAdmin = user?.role?.trim()?.toLowerCase() === "admin";

  const handleIncomingOrder = useCallback(() => {
    setSocketBonusCount((prev) => prev + 1);
    reload?.();
  }, [reload]);

  const { connected, notification, clearNotification } = useAdminOrdersSocket(
    handleIncomingOrder,
    isAdmin
  );

  const totalUnread = Math.max(unreadCount, 0) + socketBonusCount;

  const userName = user?.name || "Admin";
  const userRole = user?.role || "admin";

  const userImage =
    user?.imageUrl ||
    user?.image ||
    user?.avatar ||
    null;

  const avatarLetter =
    userName?.charAt(0)?.toUpperCase() || "A";

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    try {
      setMenuVisible(false);
      setMobileMenuVisible(false);

      logOut();

      router.replace("/home");
    } catch (error) {
      console.log("LOGOUT ERROR:", error);
    }
  };

  // =========================
  // SETTINGS
  // =========================

  const handleSettings = () => {
    setMenuVisible(false);
    setMobileMenuVisible(false);

    router.push("/admin/settings");
  };

  // =========================
  // OPEN BELL DROPDOWN
  // =========================

  const handleOpenNotifications = () => {
    setNotificationVisible(true);
    setSocketBonusCount(0);
    reload?.();
  };

  // =========================
  // NOTIFICATION PRESS
  // =========================

  const handleNotificationPress = async (item) => {
    try {
      if (!item.isRead) {
        await markAsRead?.(item._id);
      }

      setNotificationVisible(false);
      setSocketBonusCount(0);

      switch (item.type) {
        case "order":
        case "delivery":
        case "payment":
          router.push("/admin/orders");
          break;

        case "stock":
        case "promotion":
          router.push("/admin/products");
          break;

        case "account":
        case "user":
          router.push("/admin/customers");
          break;

        default:
          router.push("/notification");
      }
    } catch (error) {
      console.log(
        "NOTIFICATION ERROR:",
        error?.response?.data || error?.message
      );
    }
  };

  return (
    <>
      {/* =====================================================
          REAL-TIME TOAST BANNER
      ====================================================== */}

      {notification && (
        <div className="fixed bottom-5 right-5 z-[110] flex max-w-sm items-center justify-between gap-4 rounded-xl border border-[#C8A96E] bg-[#2D2417] px-5 py-4 text-[#FDFBF7] shadow-2xl">
          <div>
            <p className="text-sm font-bold text-[#C8A96E]">
              {notification.title}
            </p>
            <p className="mt-0.5 text-sm">{notification.message}</p>
          </div>
          <button
            type="button"
            onClick={clearNotification}
            className="rounded-lg bg-[#C8A96E] px-3 py-1.5 text-xs font-semibold text-[#2D2417] hover:opacity-90"
          >
            Xir
          </button>
        </div>
      )}

      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="sticky top-0 z-40 flex h-[72px] w-full items-center justify-between border-b border-[#E8E3DA] bg-white px-4 sm:px-6 lg:px-7">

        {/* =================================================
            LEFT SIDE
        ================================================= */}

        <div className="flex min-w-0 items-center">

          {/* MOBILE MENU BUTTON */}

          <button
            type="button"
            onClick={() =>
              setMobileMenuVisible(true)
            }
            className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#EEEAE3] bg-[#F8F6F2] text-[#2D2417] transition hover:bg-[#EFECE6] lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={21} />
          </button>

          {/* MOBILE LOGO */}

          <div className="flex items-center lg:hidden">
            <div className="flex items-center">
              <Logo />
            </div>
          </div>

          {/* DESKTOP LEFT AREA */}

          <div className="hidden items-center gap-3 lg:flex">
            <div className="h-9 w-px bg-[#E8E3DA]" />
            {isAdmin && (
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#6B7280]">
                <span
                  className={`h-2 w-2 rounded-full ${
                    connected ? "bg-emerald-500" : "bg-amber-500"
                  }`}
                />
                <span>{connected ? "Live Orders" : "Connecting..."}</span>
              </div>
            )}
          </div>
        </div>

        {/* =================================================
            RIGHT SIDE
        ================================================= */}

        <div className="flex items-center gap-2 sm:gap-4">

          {/* NOTIFICATION BELL BUTTON (NAVBAR) */}

          <button
            type="button"
            onClick={handleOpenNotifications}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[#EEEAE3] bg-[#F8F6F2] text-[#2D2417] transition hover:bg-[#EFECE6]"
            aria-label="Notifications"
          >
            <Bell size={20} />

            {totalUnread > 0 && (
              <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full border-2 border-white bg-red-500 px-1 text-[9px] font-extrabold text-white">
                {totalUnread > 99 ? "99+" : totalUnread}
              </span>
            )}
          </button>

          {/* USER */}

          <button
            type="button"
            onClick={() =>
              setMenuVisible(true)
            }
            className="flex items-center gap-2 rounded-xl px-1 py-1 transition hover:bg-[#F8F6F2]"
          >

            {/* AVATAR */}

            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#2D2417]">
              {userImage ? (
                <img
                  src={userImage}
                  alt={userName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-sm font-extrabold text-white">
                  {avatarLetter}
                </span>
              )}
            </div>

            {/* USER INFO */}

            <div className="hidden min-w-0 text-left sm:block">
              <p className="max-w-[130px] truncate text-xs font-extrabold capitalize text-[#2D2417]">
                {userName}
              </p>

              <div className="mt-1 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />

                <span className="text-[10px] capitalize text-[#8A8175]">
                  {userRole}
                </span>
              </div>
            </div>

            <ChevronDown
              size={15}
              className="hidden text-[#8A8175] sm:block"
            />
          </button>
        </div>
      </header>

      {/* =====================================================
          MOBILE SIDEBAR
      ====================================================== */}

      {mobileMenuVisible && (
        <div className="fixed inset-0 z-[100] lg:hidden">

          <button
            type="button"
            aria-label="Close menu"
            onClick={() =>
              setMobileMenuVisible(false)
            }
            className="absolute inset-0 bg-black/40"
          />

          <aside className="relative flex h-full w-[280px] max-w-[85%] flex-col bg-[#2D2417] text-white shadow-2xl">

            <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">

              <div
                onClick={() =>
                  setMobileMenuVisible(false)
                }
                className="flex items-center"
              >
                <DarkLogo />
              </div>

              <button
                type="button"
                onClick={() =>
                  setMobileMenuVisible(false)
                }
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20"
              >
                <X size={19} />
              </button>
            </div>

            <div className="border-b border-white/10 px-5 py-4">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#C8A96E]">
                  {userImage ? (
                    <img
                      src={userImage}
                      alt={userName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-base font-extrabold text-white">
                      {avatarLetter}
                    </span>
                  )}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-extrabold capitalize">
                    {userName}
                  </p>

                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400" />

                    <span className="text-[10px] capitalize text-[#C8A96E]">
                      {userRole}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-5">

              {menus.map((menu) => {
                const Icon = menu.icon;

                const active =
                  typeof window !== "undefined" &&
                  (window.location.pathname === menu.href ||
                    (menu.href !== "/admin" &&
                      window.location.pathname.startsWith(menu.href)));

                return (
                  <Link
                    key={menu.title}
                    href={menu.href}
                    onClick={() =>
                      setMobileMenuVisible(false)
                    }
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                      active
                        ? "bg-[#C8A96E] text-white"
                        : "bg-[#221f19] text-slate-300 hover:bg-[#342d23] hover:text-white"
                    }`}
                  >
                    <Icon size={20} />

                    <span className="text-sm font-medium">
                      {menu.title}
                    </span>
                  </Link>
                );
              })}
            </nav>

            <div className="border-t border-white/10 p-5">
              <p className="text-sm font-semibold">
                SAHAL SUUQ
              </p>

              <span className="text-xs text-slate-400">
                Admin Dashboard v1.0
              </span>
            </div>
          </aside>
        </div>
      )}

      {/* =====================================================
          USER DROPDOWN
      ====================================================== */}

      {menuVisible && (
        <div
          className="fixed inset-0 z-[90]"
          onClick={() =>
            setMenuVisible(false)
          }
        >
          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            className="absolute right-4 top-[68px] w-[260px] overflow-hidden rounded-2xl border border-[#E8E3DA] bg-white py-2 shadow-2xl sm:right-6"
          >

            <div className="flex items-center px-4 py-3.5">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#2D2417]">
                {userImage ? (
                  <img
                    src={userImage}
                    alt={userName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-base font-extrabold text-white">
                    {avatarLetter}
                  </span>
                )}
              </div>

              <div className="ml-3 min-w-0">
                <p className="truncate text-sm font-extrabold capitalize text-[#2D2417]">
                  {userName}
                </p>

                <p className="mt-1 truncate text-[10px] capitalize text-gray-400">
                  {userRole}
                </p>
              </div>
            </div>

            <div className="my-1 h-px bg-[#F0ECE6]" />

            <button
              onClick={handleSettings}
              className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left transition hover:bg-[#F8F6F2]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F8F6F2]">
                <Settings
                  size={18}
                  className="text-[#2D2417]"
                />
              </span>

              <span className="flex-1 text-xs font-semibold text-[#333]">
                Settings
              </span>

              <ChevronRight
                size={15}
                className="text-gray-400"
              />
            </button>

            <div className="my-1 h-px bg-[#F0ECE6]" />

            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left transition hover:bg-red-50"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50">
                <LogOut
                  size={18}
                  className="text-red-500"
                />
              </span>

              <span className="text-xs font-bold text-red-500">
                Logout
              </span>
            </button>
          </div>
        </div>
      )}

      {/* =====================================================
          NOTIFICATION DROPDOWN (NAVBAR BELL)
      ====================================================== */}

      {notificationVisible && (
        <div
          className="fixed inset-0 z-[80]"
          onClick={() =>
            setNotificationVisible(false)
          }
        >
          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            className="absolute right-4 top-[68px] max-h-[500px] w-[calc(100%-32px)] max-w-[360px] overflow-y-auto rounded-2xl border border-[#E8E3DA] bg-white shadow-2xl sm:right-[150px]"
          >

            <div className="border-b border-[#F0ECE6] px-4 py-4">
              <h3 className="text-sm font-extrabold text-[#2D2417]">
                Notifications
              </h3>

              <p className="mt-1 text-[10px] text-gray-400">
                Your latest notifications
              </p>
            </div>

            {loading ? (
              <div className="px-4 py-10 text-center text-xs text-gray-400">
                Loading notifications...
              </div>
            ) : notifications.length === 0 ? (
              <div className="px-4 py-10 text-center text-xs text-gray-400">
                No notifications yet
              </div>
            ) : (
              notifications
                .slice(0, 5)
                .map((item) => (
                  <button
                    key={item._id}
                    onClick={() =>
                      handleNotificationPress(item)
                    }
                    className={`flex w-full gap-3 border-b border-[#F5F2ED] px-4 py-3 text-left transition hover:bg-[#FAF8F5] ${
                      !item.isRead ? "bg-[#FDFBF7]" : ""
                    }`}
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F8F6F2]">
                      <Bell
                        size={18}
                        className="text-[#2D2417]"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-extrabold text-[#2D2417]">
                        {item.title}
                      </p>

                      <p className="mt-1 text-[10px] leading-4 text-gray-500">
                        {item.message}
                      </p>

                      <p className="mt-1 text-[9px] text-[#A4865A]">
                        {new Date(
                          item.createdAt
                        ).toLocaleString()}
                      </p>
                    </div>
                  </button>
                ))
            )}
          </div>
        </div>
      )}
    </>
  );
}