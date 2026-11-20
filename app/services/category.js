import api from "../home/lib/api";

const categoryService = {
  getAll: async () => {
    const res = await api.get("/api/categories");
    // console.log('yaa', res.data)
    return res.data;
  },
  getOne: async (id) => {
    const res = await api.get(`/api/categories/${id}`);
    return res.data;
  },
  create: async (data) => {
    const res = await api.post("/api/categories", data);
    return res.data;
  },
  update: async (id, data) => {
    const res = await api.put(`/api/categories/${id}`, data);
    return res.data;
  },
  remove: async (id) => {
    const res = await api.delete(`/api/categories/${id}`);
    return res.data;
  },
};

export default categoryService;
