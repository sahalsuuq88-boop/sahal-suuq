import api from "../home/lib/api";

const notificationService = {
  // CUSTOMER
  getMyNotifications: async (page = 1, limit = 20) => {
    const res = await api.get(
      `/api/notifications?page=${page}&limit=${limit}`
    );

    return res.data;
  },

  // ADMIN
  getAdminNotifications: async () => {
    const res = await api.get(
      "/api/notifications/admin"
    );

    return res.data;
  },

  markAsRead: async (id) => {
    const res = await api.put(
      `/api/notifications/${id}`
    );

    return res.data;
  },

  markAllAsRead: async () => {
    const res = await api.put(
      "/api/notifications/read-all"
    );

    return res.data;
  },

  deleteNotification: async (id) => {
    const res = await api.delete(
      `/api/notifications/${id}`
    );

    return res.data;
  },
};

export default notificationService;