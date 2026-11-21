"use client";

import { useCallback, useEffect } from "react";
import useDashboard from "../hook/useDashboard";
import { useUser } from "../hook/useUser";
import { useAdminOrdersSocket } from "../hook/useAdminOrdersSocket";
import StatCard from "./components/StatCard";
import SalesChart from "./components/SalesChart";
import RecentOrders from "./components/RecentOrders";
import ExchangeRate from "./components/exchange";

export default function AdminPage() {
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

  const { notification, clearNotification } = useAdminOrdersSocket(
    handleRealTimeOrder,
    isAdmin
  );

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
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1F2937] sm:text-3xl">
            Dashboard
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#6B7280]">
            Welcome back to AWL Trading Company Admin Panel.
          </p>
          <ExchangeRate />
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