"use client";

import { useCallback, useEffect, useState } from "react";
import useDashboard from "../hook/useDashboard";
import { useUser } from "../hook/useUser";
import { useAdminOrdersSocket } from "../hook/useAdminOrdersSocket";
import StatCard from "./components/StatCard";
import SalesChart from "./components/SalesChart";
import RecentOrders from "./components/RecentOrders";
import ExchangeRate from "./components/exchange";

export default function AdminPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const {
    stats,
    sales,
    loading,
    error,
    getStats,
    getSales,
  } = useDashboard();

  const { user } = useUser();
  const isAdmin = user?.role?.trim()?.toLowerCase() === "admin";

  useEffect(() => {
    if (isAdmin) {
      getStats();
      getSales();
    }
  }, [isAdmin, getStats, getSales]);

  const handleRealTimeOrder = useCallback(() => {
    if (isAdmin) {
      getStats();
      getSales();
    }
  }, [isAdmin, getStats, getSales]);

  const {
    notification,
    notifications,
    unreadCount,
    connected,
    soundEnabled,
    setSoundEnabled,
    testSound,
    clearNotification,
    resetUnread,
    clearAllNotifications,
  } = useAdminOrdersSocket(handleRealTimeOrder, isAdmin);

  const dashboardStats = stats?.stats || [];
  const recentOrders = stats?.latestOrders || [];
  const chartData = sales?.sales || [];

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-sm font-medium text-gray-500">
          Loading dashboard...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-600">
          {error}
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen bg-[#F8F7F4]">
      {/* Real-time Toast Notification */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 flex max-w-sm items-center justify-between gap-4 rounded-xl border border-[#C8A96E] bg-[#2D2417] px-5 py-4 text-[#FDFBF7] shadow-2xl">
          <div>
            <p className="text-sm font-bold text-[#C8A96E]">
              {notification.title}
            </p>
            <p className="mt-0.5 text-sm">{notification.message}</p>
          </div>
          <button
            type="button"
            onClick={clearNotification}
            className="rounded-lg bg-[#C8A96E] px-3 py-1.5 text-xs font-semibold text-[#2D2417] hover:opacity-90"
          >
            Xir
          </button>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <h1 className="text-2xl font-bold text-[#1F2937] sm:text-3xl">
              Dashboard
            </h1>

            <p className="mt-2 text-sm leading-6 text-[#6B7280]">
              Welcome back to AWL Trading Company Admin Panel.
            </p>
            <ExchangeRate />
          </div>

          {/* Live Status, Sound Controls & Notification Button */}
          <div className="relative flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-xs font-medium text-[#1F2937]">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  connected ? "bg-emerald-500" : "bg-amber-500"
                }`}
              />
              <span>{connected ? "Live" : "Connecting..."}</span>
            </div>

            <button
              type="button"
              onClick={() => setSoundEnabled((prev) => !prev)}
              className="rounded-lg border bg-white px-3 py-2 text-xs font-semibold text-[#1F2937] hover:bg-gray-50"
            >
              {soundEnabled ? "🔊 Voice On" : "🔇 Voice Off"}
            </button>

            <button
              type="button"
              onClick={testSound}
              className="rounded-lg border border-[#C8A96E] bg-white px-3 py-2 text-xs font-semibold text-[#2D2417] hover:bg-[#FDFBF7]"
            >
              Test Voice
            </button>

            {/* Notification Bell Button */}
            <button
              type="button"
              onClick={() => {
                setMenuOpen((prev) => !prev);
                if (!menuOpen) resetUnread();
              }}
              aria-label="Notifications"
              className="relative flex items-center gap-2 rounded-xl bg-[#2D2417] px-3.5 py-2 text-xs font-semibold text-[#FDFBF7] shadow hover:opacity-95"
            >
              <span className="text-base leading-none">🔔</span>
              <span>Notifications</span>
              <span className="rounded-full bg-[#C8A96E] px-2 py-0.5 text-[11px] font-bold text-[#2D2417]">
                {unreadCount}
              </span>
            </button>

            {/* Notification Dropdown Panel */}
            {menuOpen && (
              <div className="absolute right-0 top-12 z-40 w-80 rounded-xl border border-[#E7DFD1] bg-white p-4 shadow-xl sm:w-96">
                <div className="mb-3 flex items-center justify-between border-b pb-2">
                  <h2 className="text-sm font-bold text-[#2D2417]">
                    Order Notifications
                  </h2>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={clearAllNotifications}
                      className="text-xs font-medium text-red-600 hover:underline"
                    >
                      Clear All
                    </button>
                    <button
                      type="button"
                      onClick={() => setMenuOpen(false)}
                      className="text-xs font-medium text-gray-500 hover:text-gray-800"
                    >
                      Close
                    </button>
                  </div>
                </div>

                {notifications.length === 0 ? (
                  <p className="py-6 text-center text-xs text-gray-500">
                    Weli ogeysiis dalab cusub ma iman.
                  </p>
                ) : (
                  <div className="max-h-72 space-y-2 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className="rounded-lg border border-[#F0EAE0] bg-[#FDFBF7] p-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#2D2417]">
                            {n.title}
                          </span>
                          <span className="text-[11px] text-gray-400">
                            {n.time}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-gray-700">
                          {n.message}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
          {dashboardStats.map((item) => (
            <StatCard
              key={item.type}
              title={item.title}
              value={item.value}
              change={item.change}
              type={item.type}
              color={item.color}
            />
          ))}
        </div>

        {/* Sales Chart */}
        <div className="mt-6">
          <SalesChart data={chartData} />
        </div>

        {/* Recent Orders */}
        <div className="mt-6">
          <RecentOrders orders={recentOrders} />
        </div>

      </div>
    </main>
  );
}