
"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../hook/useUser";

import Navbar from "./component/Navbar";

const Layout = ({ children }) => {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    const role = user?.role?.trim()?.toLowerCase();

    if (!loading && role === "admin") {
      router.replace("/admin");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (user?.role?.trim()?.toLowerCase() === "admin") {
    return (
      <div className="flex items-center justify-center h-screen">
        Redirecting...
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
