import api from "../home/lib/api";

const faqService = {
  getAll: async () => {
    const response = await api.get("/api/faq");
    return response.data.faqs;
  },

  getAdmin: async () => {
    const response = await api.get("/api/faq/admin");
    return response.data.faqs;
  },

  create: async (data) => {
    const response = await api.post("/api/faq", data);
    return response.data.faq;
  },

  update: async (id, data) => {
    const response = await api.put(`/api/faq/${id}`, data);
    return response.data.faq;
  },

  remove: async (id) => {
    const response = await api.delete(`/api/faq/${id}`);
    return response.data;
  },
};

export default faqService;

