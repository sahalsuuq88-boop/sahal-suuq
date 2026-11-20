import api from "../home/lib/api";


const paymentService = {


    create: (data) =>
        api.post("/payments", data),


    getAll: () =>
        api.get("/payments"),


    getOne: (id) =>
        api.get(`/payments/${id}`),


    updateStatus: (id, status) =>
        api.put(
            `/payments/${id}`,
            {
                status
            }
        )


};


export default paymentService;