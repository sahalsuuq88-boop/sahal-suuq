"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../hook/useUser";

import Navbar from "./component/Navbar";
import AuthGuard from "../component/AuthGard";

const Layout = ({ children }) => {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user?.role?.trim() === "admin") {
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

  if (user?.role?.trim() === "admin") {
    return (
      <div className="flex items-center justify-center h-screen">
        Redirecting...
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {" "}
        <AuthGuard>{children} </AuthGuard>
      </main>
    </div>
  );
};

export default Layout;
