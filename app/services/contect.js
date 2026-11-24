import api from "../home/lib/api";

const contactService = {
  getAll: async () => {
    const res = await api.get("/api/contact");
    // console.log('yaa', res.data)
    return res.data;
  },
  getOne: async (id) => {
    const res = await api.get(`/api/contact/${id}`);
    return res.data;
  },
  create: async (data) => {
    const res = await api.post("/api/contact", data);
    return res.data;
  },
  update: async (id, data) => {
    const res = await api.put(`/api/contact/${id}`, data);
    return res.data;
  },
  remove: async (id) => {
    const res = await api.delete(`/api/contact/${id}`);
    return res.data;
  },
};

export default contactService;
