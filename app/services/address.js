import api from "../home/lib/api";

const addressService = {
  getAll: async () => {
    try {
      const response = await api.get("/api/address"); // Wuxuu noqon karaa /api/addresses
      console.log("ADDRESS RESPONSE:", response.data); // Halkan ka eeg Console-ka app-kaaga
      
      // Soo celi iyadoo la eegayo meesha ay xogtu ku jirto
      return response.data.addresses || response.data.address || response.data;
    } catch (error) {
      console.log("ADDRESS ERROR:", error.response?.data || error.message);
      return [];
    }
  },
  // ... inta kale waa sidoodii

  create: async (data) => {
    const response = await api.post("/api/address", data);
    return response.data.address;
  },

  update: async (id, data) => {
    const response = await api.put(`/api/address/${id}`, data);
    return response.data.address;
  },

  remove: async (id) => {
    const response = await api.delete(`/api/address/${id}`);
    return response.data;
  },

  setDefault: async (id) => {
    const response = await api.patch(
      `/api/addresses/${id}/default`
    );

    return response.data.address;
  },
};

export default addressService;

