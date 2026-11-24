
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../hook/useUser";

export default function AuthGuard({ children, requireAdmin = false }) {
  const router = useRouter();
  const { user, loading } = useUser();

  useEffect(() => {
    if (loading || !requireAdmin) return;

    const role = user?.role?.trim()?.toLowerCase();

    if (!user) {
      router.replace("/login");
    } else if (role !== "admin") {
      router.replace("/home");
    }
  }, [user, loading, requireAdmin, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F7F4]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#C8A96E] border-t-transparent" />
      </div>
    );
  }

  if (requireAdmin && user?.role?.trim()?.toLowerCase() !== "admin") {
    return null;
  }

  return children;
}
