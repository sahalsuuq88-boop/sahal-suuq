import { useCallback, useEffect, useState } from "react";
import notificationService from "../services/notification";
import { useUser } from "./useUser";

export default function useNotifications() {
  const { user } = useUser();

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // =====================================================
  // LOAD NOTIFICATIONS
  // =====================================================

  const loadNotifications = useCallback(async () => {
    if (!user) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }

    try {
      setLoading(true);

      const role = user?.role?.trim()?.toLowerCase();

      console.log("🔐 NOTIFICATION ROLE:", role);

      let data;

      // ==========================================
      // ADMIN
      // ==========================================

      if (role === "admin") {
        console.log("🔔 Loading ADMIN notifications");

        data = await notificationService.getAdminNotifications();
      }

      // ==========================================
      // CUSTOMER
      // ==========================================
      else {
        console.log("🔔 Loading CUSTOMER notifications");

        data = await notificationService.getMyNotifications();
      }

      const list = data?.notifications || [];

      setNotifications(list);
      setUnreadCount(data?.unreadCount || 0);
    } catch (error) {
      console.log(
        "LOAD NOTIFICATIONS ERROR:",
        error?.response?.data || error?.message,
      );
    } finally {
      setLoading(false);
    }
  }, [user]);

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  // =====================================================
  // MARK AS READ
  // =====================================================

  const markAsRead = async (id) => {
    const notification = notifications.find((item) => item._id === id);

    if (!notification || notification.isRead) {
      return;
    }

    // UI-ga isla markiiba update garee
    setNotifications((current) =>
      current.map((item) =>
        item._id === id
          ? {
              ...item,
              isRead: true,
            }
          : item,
      ),
    );

    setUnreadCount((current) => Math.max(0, current - 1));

    try {
      await notificationService.markAsRead(id);
    } catch (error) {
      console.log(
        "MARK AS READ ERROR:",
        error?.response?.data || error?.message,
      );

      // Haddii API-ga fashilmo, dib ugu celi unread
      setNotifications((current) =>
        current.map((item) =>
          item._id === id
            ? {
                ...item,
                isRead: false,
              }
            : item,
        ),
      );

      setUnreadCount((current) => current + 1);
    }
  };

  // =====================================================
  // MARK ALL AS READ
  // =====================================================

  const markAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();

      // DHAMMAAN notifications-ka way sii joogayaan
      setNotifications((current) =>
        current.map((item) => ({
          ...item,
          isRead: true,
        })),
      );

      setUnreadCount(0);
    } catch (error) {
      console.log(
        "MARK ALL AS READ ERROR:",
        error?.response?.data || error?.message,
      );
    }
  };

  // =====================================================
  // RELOAD
  // =====================================================

  const reload = useCallback(async () => {
    await loadNotifications();
  }, [loadNotifications]);

  // =====================================================
  // DELETE
  // =====================================================

  const deleteNotification = async (id) => {
    const deletedNotification = notifications.find((item) => item._id === id);

    try {
      setNotifications((current) => current.filter((item) => item._id !== id));

      if (deletedNotification && !deletedNotification.isRead) {
        setUnreadCount((current) => Math.max(0, current - 1));
      }

      await notificationService.deleteNotification(id);
    } catch (error) {
      console.log(
        "DELETE NOTIFICATION ERROR:",
        error?.response?.data || error?.message,
      );

      await loadNotifications();
    }
  };

  return {
    notifications,
    unreadCount,
    loading,
    reload,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  };
}
