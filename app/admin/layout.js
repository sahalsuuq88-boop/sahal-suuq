"use client";

import AuthGuard from "../component/AuthGard";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="lg:ml-72">
        {/* Header */}
        <Navbar />

        {/* Page Content */}
        <main className="min-h-[calc(100vh-72px)]">
          <AuthGuard>{children}</AuthGuard>
        </main>
      </div>
    </div>
  );
}
