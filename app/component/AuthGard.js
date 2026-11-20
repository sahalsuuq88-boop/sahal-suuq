"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "../hook/useUser";

const publicAuthPages = ["/login", "/LoginPage", "/register"];

export default function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useUser();

  useEffect(() => {
    if (loading) return;

    const isAuthPage = publicAuthPages.includes(pathname);

    // User ma login → ha gelin protected pages
    if (!user && !isAuthPage) {
      router.replace("/login");
      return;
    }

    // User hore u login yahay → ha gelin Login/Register
    if (user && isAuthPage) {
      const role = user?.role?.trim()?.toLowerCase();

      if (role === "admin") {
        router.replace("/admin");
      } else {
        router.replace("/");
      }
    }
  }, [user, loading, pathname, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F7F4]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#C8A96E] border-t-transparent" />
      </div>
    );
  }

  return children;
}