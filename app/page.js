"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "./hook/useUser";



export default function Home() {
  const router = useRouter();
  const { user, loading } = useUser();

  useEffect(() => {
    if (loading) return;

    // Haddii user jiro oo uu admin yahay
    if (user?.role?.trim()?.toLowerCase() === "admin") {
      router.replace("/admin");
      return;
    }

    // Customer ama user aan login ahayn
    router.replace("/home");
  }, [user, loading, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F7F4]">
      <div className="flex flex-col items-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#E7DFD1] border-t-[#C8A96E]" />

        <p className="mt-4 text-sm text-gray-500">
          Loading...
        </p>
      </div>
    </div>
  );
}