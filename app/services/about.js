import api from "../home/lib/api";

const aboutService = {
  get: async () => {
    const response = await api.get("/api/about");
    return response.data.about;
  },

  create: async (data) => {
    const response = await api.post("/api/about", data);
    return response.data.about;
  },

  update: async (data) => {
    const response = await api.put("/api/about", data);
    return response.data.about;
  },
};

export default aboutService;

