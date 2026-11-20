import api from "../home/lib/api";

const userService = {
  // =========================
  // GET ALL CUSTOMERS
  // =========================
  getAll: async () => {
    const res = await api.get("/api/customers");

    return {
      data: res.data,
    };
  },

  // =========================
  // GET CUSTOMERS
  // =========================
  getCustomers: async () => {
    const res = await api.get("/api/users/customers");

    return {
      data: res.data.users,
    };
  },

  // =========================
  // GET ONE USER
  // =========================
  getOne: async (id) => {
    const res = await api.get(`/api/users/${id}`);

    return res.data;
  },

  // =========================
  // CHANGE PASSWORD
  // =========================
  changePassword: async (data) => {
    const res = await api.put("/api/user/change-password", data);

    return res.data;
  },

  // =========================
  // UPDATE USER
  // =========================
  update: async (id, data) => {
    const res = await api.put(`/api/user/${id}`, data);

    return res.data;
  },

  // =========================
  // UPDATE STATUS
  // =========================
  updateStatus: async (id) => {
    const res = await api.put(`/api/customers/${id}/role`);

    return res.data;
  },

  // =========================
  // DELETE USER
  // =========================
  remove: async (id) => {
    const res = await api.delete(`/api/customers/${id}`);

    return res.data;
  },

  // =========================
  // FORGOT PASSWORD
  // =========================
  forgotPassword: async (data) => {
    const res = await api.post("/api/user/forgot-password", data);

    return res.data;
  },

  // =========================
  // RESET PASSWORD
  // =========================
  resetPassword: async (token, data) => {
    const res = await api.put(`/api/user/reset-password/${token}`, data);

    return res.data;
  },

  // =========================
  // UPDATE PUSH TOKEN
  // =========================
  updatePushToken: async (pushToken, pushPlatform) => {
    const res = await api.put("/api/user/push-token", {
      pushToken,
      pushPlatform,
    });

    return res.data;
  },

  // =========================
  // GET CURRENT PROFILE
  // =========================
  getProfile: async () => {
    const res = await api.get("/api/user/profile");

    return res.data;
  },

  // =========================
  // UPDATE CURRENT PROFILE
  // =========================
  updateProfile: async (data) => {
    const res = await api.put("/api/user/profile", data);

    return res.data;
  },
};

export default userService;
