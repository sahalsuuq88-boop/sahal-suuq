"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import ProductGrid from "./component/ProductGrid";
import Footer from "./component/Footer";
import Hero from "./component/Hero";
import { useUser } from "../hook/useUser";

export default function HomePage() {
  const { user, loading } = useUser();
  const router = useRouter();
  const redirected = useRef(false);

  useEffect(() => {
    if (loading) return;

    if (
      user?.role?.trim()?.toLowerCase() === "admin" &&
      !redirected.current
    ) {
      redirected.current = true;
      router.replace("/admin");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF8F5]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#E8E3DA] border-t-[#0B3B24]" />
          <p className="text-sm font-medium text-[#2D2417]">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (user?.role?.trim()?.toLowerCase() === "admin") {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#2D2417] pt-1">
      <Hero />

      <ProductGrid />

      <Footer />
    </main>
  );
}