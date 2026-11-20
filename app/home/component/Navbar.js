"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Heart,
  ShoppingCart,
  User,
  Settings,
  ChevronRight,
  Menu,
  X,
  Home,
  Store,
  History,
  Phone,
} from "lucide-react";

import { useShop } from "../../ShopContext";
import { useWishlistContext } from "../../context/wishlist";
import { useUser } from "../../hook/useUser";
import Logo from "./logo";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const { user, logOut } = useUser();
  const { totalItems } = useShop();
  const { wishlistCount } = useWishlistContext();

  const [menuVisible, setMenuVisible] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const desktopMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const userImage =
    user?.image || user?.avatar || user?.profileImage || user?.photo || null;

  const userName = user?.name || "User";
  const avatarLetter = userName.charAt(0).toUpperCase();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      const clickedInsideDesktop =
        desktopMenuRef.current?.contains(event.target);

      const clickedInsideMobile =
        mobileMenuRef.current?.contains(event.target);

      if (!clickedInsideDesktop && !clickedInsideMobile) {
        setMenuVisible(false);
      }

      const clickedInsideMobileNav = event.target.closest(
        "#mobile-navigation"
      );

      const clickedHamburger = event.target.closest(
        "#mobile-menu-button"
      );

      if (!clickedInsideMobileNav && !clickedHamburger) {
        setMobileMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  const handleWishlist = () => {
    router.push("/home/favorate");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  const handleProfile = () => {
    setMenuVisible(false);
    router.push("/home/profile");
  };

  const handleSettings = () => {
    setMenuVisible(false);
    router.push("/settings");
  };

  const handleLogout = () => {
    try {
      console.log("LOGOUT BUTTON CLICKED");

      setMenuVisible(false);

      logOut();

      router.replace("/login");
    } catch (error) {
      console.error("LOGOUT ERROR:", error);
    }
  };

  const navItems = [
    {
      name: "Home",
      href: "/home",
      icon: Home,
    },
    {
      name: "Shop",
      href: "/home/shop",
      icon: Store,
    },
    {
      name: "History",
      href: "/home/history",
      icon: History,
    },
    {
      name: "About",
      href: "/home/about",
      icon: User,
    },
    {
      name: "Contact",
      href: "/home/contact",
      icon: Phone,
    },
  ];

  const isActive = (href) => {
    if (href === "/home") {
      return pathname === "/home" || pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-80 w-full border-b border-[#E8E3DA] bg-[#FDFBF7]/30 shadow-sm backdrop-blur-2xl">
      <div className="mx-auto flex min-h-[70px] max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8">
        {/* =========================
          LOGO
      ========================= */}
        <div className="shrink-0">
          <Logo />
        </div>

        {/* =========================
          DESKTOP NAVIGATION
      ========================= */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${active
                  ? "bg-[#2D2417] text-white shadow-sm"
                  : "text-[#5C5348] hover:bg-[#F0ECE6] hover:text-[#2D2417]"
                  }`}
              >
                <Icon size={17} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* =========================
    RIGHT ACTIONS
========================= */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            aria-label="Wishlist"
            className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[#2D2417] transition hover:bg-[#F0ECE6] active:scale-95"
          >
            <Heart
              size={21}
              className={
                wishlistCount > 0
                  ? "fill-red-500 text-red-500"
                  : "text-[#2D2417]"
              }
            />

            {wishlistCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#C8A96E] px-1 text-[9px] font-extrabold text-white">
                {wishlistCount > 99 ? "99+" : wishlistCount}
              </span>
            )}
          </button>

          {/* Cart */}
          <Link
            href="/home/cart"
            aria-label="Cart"
            className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2D2417] text-white transition hover:bg-[#463827] active:scale-95 sm:w-auto sm:gap-2 sm:px-7"
          >
            <span className="hidden sm:block">Cart</span>

            <ShoppingCart size={20} />

            {totalItems > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-[19px] min-w-[19px] items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-extrabold text-white">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </Link>

          {/* =========================
      DESKTOP LOGIN / PROFILE
  ========================= */}
          {!user ? (
            <button
              onClick={handleLogin}
              className="hidden rounded-xl px-3 py-2 text-sm font-semibold text-[#2D2417] transition hover:bg-[#F0ECE6] sm:block"
            >
              Login
            </button>
          ) : (
            <div ref={desktopMenuRef} className="relative hidden sm:block">
              <button
                onClick={() => setMenuVisible(!menuVisible)}
                className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-[#E8E3DA] bg-white transition hover:scale-105 active:scale-95"
                aria-label="User menu"
              >
                {userImage ? (
                  <img
                    src={userImage}
                    alt={userName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#2D2417] text-sm font-bold text-white">
                    {avatarLetter}
                  </div>
                )}
              </button>

              {menuVisible && (
                <div className="absolute right-0 top-[52px] z-50 w-[270px] overflow-hidden rounded-2xl border border-[#E8E3DA] bg-[#FDFBF7] py-2 shadow-xl">
                  <div className="flex items-center px-4 py-3.5">
                    {userImage ? (
                      <img
                        src={userImage}
                        alt={userName}
                        className="h-11 w-11 rounded-full bg-[#E8E3DA] object-cover"
                      />
                    ) : (
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2D2417] text-base font-extrabold text-white">
                        {avatarLetter}
                      </div>
                    )}

                    <div className="ml-3 min-w-0 flex-1">
                      <p className="truncate text-sm font-extrabold capitalize text-[#2D2417]">
                        {userName}
                      </p>

                      <p className="mt-1 truncate text-[10px] text-gray-400">
                        {user?.email || ""}
                      </p>
                    </div>
                  </div>

                  <div className="my-1 h-px bg-[#F0ECE6]" />

                  <button
                    type="button"
                    onClick={handleProfile}
                    className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left transition hover:bg-[#F8F6F2]"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F8F6F2]">
                      <User size={18} className="text-[#2D2417]" />
                    </span>

                    <span className="flex-1 text-xs font-semibold text-[#333]">
                      My Profile
                    </span>

                    <ChevronRight size={15} className="text-gray-400" />
                  </button>

                  {/* <button
                    type="button"
                    onClick={handleSettings}
                    className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left transition hover:bg-[#F8F6F2]"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F8F6F2]">
                      <Settings size={18} className="text-[#2D2417]" />
                    </span>

                    <span className="flex-1 text-xs font-semibold text-[#333]">
                      Settings
                    </span>

                    <ChevronRight size={15} className="text-gray-400" />
                  </button> */}

                  <div className="my-1 h-px bg-[#F0ECE6]" />

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left transition hover:bg-red-50"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50">
                      {/* <LogOut size={18} className="text-red-500" /> */}
                    </span>

                    <span className="text-xs font-bold text-red-500">
                      Logout
                    </span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* =========================
    MOBILE USER / LOGIN
========================= */}

          {!user ? (
            // User NOT logged in
            <button
              onClick={handleLogin}
              className="flex h-10 shrink-0 items-center justify-center rounded-xl text-[#2D2417] px-3 text-xs font-bold  transition  active:scale-95 sm:hidden"
            >
              Login
            </button>
          ) : (
            // User logged in
            <div ref={mobileMenuRef} className="relative sm:hidden">
              <button
                onClick={() => setMenuVisible(!menuVisible)}
                className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-[#E8E3DA] bg-white transition hover:scale-105 active:scale-95"
                aria-label="User menu"
              >
                {userImage ? (
                  <img
                    src={userImage}
                    alt={userName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#2D2417] text-sm font-bold text-white">
                    {avatarLetter}
                  </div>
                )}
              </button>

              {/* =========================
        MOBILE USER DROPDOWN
    ========================= */}

              {menuVisible && (
                <div className="absolute right-0 top-[50px] z-[100] w-[250px] overflow-hidden rounded-2xl border border-[#E8E3DA] bg-white py-2 shadow-2xl">
                  {/* User Information */}
                  <div className="flex items-center px-4 py-3.5">
                    {userImage ? (
                      <img
                        src={userImage}
                        alt={userName}
                        className="h-11 w-11 shrink-0 rounded-full bg-[#E8E3DA] object-cover"
                      />
                    ) : (
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#2D2417] text-base font-extrabold text-white">
                        {avatarLetter}
                      </div>
                    )}

                    <div className="ml-3 min-w-0 flex-1">
                      <p className="truncate text-sm font-extrabold capitalize text-[#2D2417]">
                        {userName}
                      </p>

                      <p className="mt-1 truncate text-[10px] text-gray-400">
                        {user?.email || ""}
                      </p>
                    </div>
                  </div>

                  <div className="my-1 h-px bg-[#F0ECE6]" />

                  {/* My Profile */}
                  <button
                    onClick={handleProfile}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-[#F8F6F2] active:bg-[#F0ECE6]"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F8F6F2]">
                      <User size={18} className="text-[#2D2417]" />
                    </span>

                    <span className="flex-1 text-xs font-semibold text-[#333]">
                      My Profile
                    </span>

                    <ChevronRight size={15} className="text-gray-400" />
                  </button>

                  {/* Settings */}
                  <button
                    onClick={handleSettings}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-[#F8F6F2] active:bg-[#F0ECE6]"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F8F6F2]">
                      <Settings size={18} className="text-[#2D2417]" />
                    </span>

                    <span className="flex-1 text-xs font-semibold text-[#333]">
                      Settings
                    </span>

                    <ChevronRight size={15} className="text-gray-400" />
                  </button>

                  {/* Wishlist */}
                  <button
                    onClick={() => {
                      setMenuVisible(false);
                      handleWishlist();
                    }}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-[#F8F6F2] active:bg-[#F0ECE6]"
                  >
                    <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F8F6F2]">
                      <Heart
                        size={18}
                        className={
                          wishlistCount > 0
                            ? "fill-red-500 text-red-500"
                            : "text-[#2D2417]"
                        }
                      />

                      {wishlistCount > 0 && (
                        <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[8px] font-bold text-white">
                          {wishlistCount > 99 ? "99+" : wishlistCount}
                        </span>
                      )}
                    </span>

                    <span className="flex-1 text-xs font-semibold text-[#333]">
                      Wishlist
                    </span>

                    <ChevronRight size={15} className="text-gray-400" />
                  </button>

                  {/* Cart */}
                  <Link
                    href="/home/cart"
                    onClick={() => setMenuVisible(false)}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-[#F8F6F2] active:bg-[#F0ECE6]"
                  >
                    <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F8F6F2]">
                      <ShoppingCart size={18} className="text-[#2D2417]" />

                      {totalItems > 0 && (
                        <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[8px] font-bold text-white">
                          {totalItems > 99 ? "99+" : totalItems}
                        </span>
                      )}
                    </span>

                    <span className="flex-1 text-xs font-semibold text-[#333]">
                      Cart
                    </span>

                    <ChevronRight size={15} className="text-gray-400" />
                  </Link>

                  <div className="my-1 h-px bg-[#F0ECE6]" />

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-red-50 active:bg-red-100"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50">
                      {/* <LogOut size={18} className="text-red-500" /> */}
                    </span>

                    <span className="text-xs font-bold text-red-500">
                      Logout
                    </span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* =========================
      MOBILE MENU
  ========================= */}
          <button
            id="mobile-menu-button"
            onClick={() => setMobileMenu(!mobileMenu)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[#2D2417] transition hover:bg-[#F0ECE6] active:scale-95 md:hidden"
            aria-label="Open navigation"
          >
            {mobileMenu ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* PREMIUM MOBILE NAVIGATION */}
      {mobileMenu && (
        <div
          id="mobile-navigation"
          className="absolute right-2 top-18 z-[70] w-50 border-t border-[#E8E3DA] bg-[#FDFBF7] shadow-2xl md:hidden rounded-lg"
        >
          <div className="mx-auto max-w-7xl px-5 py-6">

            {/* MENU HEADER */}


            {/* NAVIGATION LINKS */}
            <nav className="flex flex-col gap-2">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenu(false)}
                    className={`group flex items-center justify-between rounded-2xl px-4 py-3.5 transition-all duration-300 ${active
                      ? "bg-[#2D2417] text-white shadow-lg"
                      : "bg-white text-[#5C5348] hover:bg-[#F0ECE6] active:scale-[0.98]"
                      }`}
                    style={{
                      animation: `mobileNavEnter 350ms ease both`,
                      animationDelay: `${index * 60}ms`,
                    }}
                  >
                    <div className="flex items-center gap-1">
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-xl ${active
                          ? "bg-[#C8A96E] text-[#2D2417]"
                          : "bg-[#F8F6F2] text-[#8A795F]"
                          }`}
                      >
                        <Icon size={19} />
                      </span>

                      <span className="text-sm font-bold">
                        {item.name}
                      </span>
                    </div>

                    <ChevronRight
                      size={17}
                      className={active ? "text-[#C8A96E]" : "text-gray-400"}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* FOOTER */}
            <p className="mt-5 text-center text-[10px] tracking-widest text-[#A49A8B]">
              SAHAL SUUQ
            </p>

          </div>
        </div>
      )}

    </header>
  );
}
