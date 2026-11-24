
"use client";

import AuthGuard from "../component/AuthGard";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <AuthGuard requireAdmin>
      <div className="min-h-screen bg-[#F8F7F4]">
        <Sidebar />

        <div className="lg:ml-72">
          <Navbar />

          <main className="min-h-[calc(100vh-72px)]">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
