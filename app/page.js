
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "./hook/useUser";

export default function Home() {
  const router = useRouter();
  const { user, loading } = useUser();

  useEffect(() => {
    if (loading) return;

    if (user?.role?.trim()?.toLowerCase() === "admin") {
      router.replace("/admin");
    } else {
      router.replace("/home");
    }
  }, [user, loading, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F7F4]">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#E7DFD1] border-t-[#C8A96E]" />
    </div>
  );
}
