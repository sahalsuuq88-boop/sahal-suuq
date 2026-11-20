import api from "../home/lib/api";

const productService = {
  // GET CUSTOMER PRODUCTS
  getAll: async () => {
    const res = await api.get("/api/products");

    return (
      res.data?.products ||
      res.data?.data ||
      (Array.isArray(res.data) ? res.data : [])
    );
  },

  // GET ALL PRODUCTS FOR ADMIN
  getAllAdmin: async () => {
    const res = await api.get("/api/products/admin");

    return (
      res.data?.products ||
      res.data?.data ||
      (Array.isArray(res.data) ? res.data : [])
    );
  },

  // GET ONE PRODUCT
  getOne: async (id) => {
    const res = await api.get(`/api/products/${id}`);

    return res.data?.product || res.data;
  },

  // CREATE PRODUCT
  create: async (data) => {
    const res = await api.post("/api/products", data);

    return res.data?.product || res.data;
  },

  // UPDATE PRODUCT
  update: async (id, data) => {
    const res = await api.put(`/api/products/${id}`, data);

    return res.data?.product || res.data;
  },

  // DELETE PRODUCT
  remove: async (id) => {
    await api.delete(`/api/products/${id}`);

    return id;
  },

  // REVIEW
  review: async (id, data) => {
    const res = await api.post(
      `/api/products/${id}/review`,
      data
    );

    return res.data;
  },
};

export default productService;