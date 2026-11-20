// import api from "../home/lib/api";

import api from "../home/lib/api";

// const orderService = {
//   create: (data) => api.post("/api/orders", data),

//   getAll: async () => {
//     const res = await api.get("api/orders");
//     return res.data;
//   },

//   getMyOrders: () => api.get("/api/orders/my-orders"),

//   getOne: (id) => api.get(`/api/orders/${id}`),

//   updateStatus: (id, status) =>
//     api.put(`/api/orders/${id}`, {
//       status,
//     }),

//   remove: (id) => api.delete(`/api/orders/${id}`),

//   // getAll: async () => {

//   // const res = await api.get("/orders");

//   // console.log("ORDER API RESPONSE:", res);

//   // return res;

//   // },
// };

// export default orderService;



const productService = {
  getAll: async () => {
    const res = await api.get("/api/orders");
    // console.log('data all', res.data)
    return res.data.orders; // ama res.data haddii backend-ku array soo celiyo
  },

  getOne: async (id) => {
    const res = await api.get(`/api/orders/${id}`);
    return res.data;
  },
  getMyOrders: async () => {
    const res = await api.get("/api/orders/my-orders");
    return res.data;
  },

  create: async (data) => {
    const res = await api.post("/api/orders", data);
    return res.data;
  },

  update: async (id, data) => {
    const res = await api.put(`/api/orders/${id}`, data);
    return res.data;
  },

  remove: async (id) => {
    await api.delete(`/api/orders/${id}`);
  },

  review: async (id, data) => {
    const res = await api.post(`/api/orders/${id}/review`, data);
    return res.data;
  },
};

export default productService;