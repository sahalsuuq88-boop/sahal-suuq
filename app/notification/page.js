"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import NotificationItem from "./notification";
import useNotifications from "../hook/useNotification";
import { useUser } from "../hook/useUser";

export default function NotificationsScreen() {
  const router = useRouter();
  const { user } = useUser();

  const {
    notifications = [],
    loading,
    reload,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotifications();

  const [refreshing, setRefreshing] = useState(false);

  // ==========================================
  // REFRESH
  // ==========================================

  const handleRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      await reload();
    } catch (error) {
      console.error("❌ NOTIFICATION REFRESH ERROR:", error);
    } finally {
      setRefreshing(false);
    }
  }, [reload]);

  // ==========================================
  // HANDLE NOTIFICATION PRESS
  // ==========================================

  const handlePress = async (item) => {
    try {
      // Mark notification as read
      if (!item.isRead) {
        await markAsRead(item._id);
      }

      const role = user?.role?.trim()?.toLowerCase();

      console.log("🔐 USER ROLE:", role);
      console.log("🔔 NOTIFICATION:", item);

      // ==========================================
      // ADMIN
      // ==========================================

      if (role === "admin") {
        if (item.type === "order") {
          console.log("➡️ ADMIN → /admin/Orders");

          router.push("/admin/orders");
          return;
        }

        router.push("/admin");
        return;
      }

      // ==========================================
      // CUSTOMER
      // ==========================================

      if (item.type === "order" && item.order?._id) {
        console.log(
          "➡️ CUSTOMER → ORDER:",
          item.order._id
        );

        router.push(`/orderSummary/${item.order._id}`);
        return;
      }

      // ==========================================
      // CUSTOMER NOTIFICATION LINK
      // ==========================================

      if (item.link) {
        router.push(item.link);
        return;
      }
    } catch (error) {
      console.error(
        "❌ NOTIFICATION PRESS ERROR:",
        error?.response?.data || error?.message
      );
    }
  };

  // ==========================================
  // DELETE
  // ==========================================

  const handleDelete = async (id) => {
    try {
      await deleteNotification(id);
    } catch (error) {
      console.error(
        "❌ DELETE NOTIFICATION ERROR:",
        error?.response?.data || error?.message
      );
    }
  };

  // ==========================================
  // UNREAD COUNT
  // ==========================================

  const hasUnread = notifications.some(
    (item) => !item.isRead
  );

  // ==========================================
  // LOADING
  // ==========================================

  if (loading && notifications.length === 0) {
    return (
      <main className="min-h-screen bg-[#F8F8F8]">
        <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">

          {/* Header Skeleton */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <div className="h-7 w-44 animate-pulse rounded bg-gray-200" />
              <div className="mt-2 h-4 w-28 animate-pulse rounded bg-gray-200" />
            </div>

            <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
          </div>

          {/* Notification Skeletons */}
          <div className="space-y-3">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-24 animate-pulse rounded-2xl border border-gray-200 bg-white"
              />
            ))}
          </div>

        </div>
      </main>
    );
  }

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <main className="min-h-screen bg-[#F8F8F8]">

      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">

        {/* =====================================
            HEADER
        ===================================== */}

        <div className="mb-5 flex items-center justify-between gap-4">

          <div>
            <h1 className="text-2xl font-bold text-[#2D2417]">
              Notifications
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {notifications.length} Notifications
            </p>
          </div>

          {hasUnread && (
            <button
              type="button"
              onClick={markAllAsRead}
              disabled={loading}
              className="text-xs font-bold text-[#A4865A] transition hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Mark all as read
            </button>
          )}

        </div>

        {/* =====================================
            REFRESH BUTTON
        ===================================== */}

        <div className="mb-4 flex justify-end">
          <button
            type="button"
            onClick={handleRefresh}
            disabled={refreshing}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {/* =====================================
            NOTIFICATIONS
        ===================================== */}

        {notifications.length === 0 ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white px-6 text-center">

            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F4EEE4]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-[#A4865A]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </div>

            <h2 className="text-lg font-bold text-[#444]">
              No Notifications
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              You're all caught up.
            </p>

          </div>
        ) : (
          <div className="space-y-3">

            {notifications.map((item) => (
              <NotificationItem
                key={item._id}
                item={item}
                onPress={() => handlePress(item)}
                onDelete={() =>
                  handleDelete(item._id)
                }
              />
            ))}

          </div>
        )}

      </div>

    </main>
  );
}