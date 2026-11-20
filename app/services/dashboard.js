import api from "../home/lib/api";


const dashboardService = {


    stats:() =>
        api.get("/api/dashboard"),


    sales:() =>
        api.get("api/dashboard/sales")


};


export default dashboardService;