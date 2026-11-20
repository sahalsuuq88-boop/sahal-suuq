import api from "../home/lib/api";

const wishlistService = {
  getAll: async () => {
    const response = await api.get("/api/whishlist"); // Ama /api/wishlist iyagoo ku xiran sidaada backend-ka
    // Maadaama response.data uu yahay Array toos ah, waxaan soo celineynaa response.data toos ah
    return response.data;
  },

  create: (product) =>
    api.post("api/whishlist", {
      product,
    }),

  remove: (id) => api.delete(`api/whishlist/${id}`),
};

export default wishlistService;
