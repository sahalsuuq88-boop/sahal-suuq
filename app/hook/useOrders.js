import useCrud from "./useCrud";
import orderService from "../services/orderService";

export default function useOrders() {
  const crud = useCrud(orderService);

  // CREATE ORDER
  const createOrder = async (data) => {
    return await orderService.create(data);
  };

  // GET MY ORDERS
  const getMyOrders = async () => {
    try {
      const data = await orderService.getMyOrders();

      const orders = data?.orders || [];

      crud.setItems(orders);

      return orders;
    } catch (error) {
      console.log(
        "Get my orders error:",
        error?.response?.data || error.message
      );

      throw error;
    }
  };

  return {
    ...crud,

    create: createOrder,

    getMyOrders,
  };
}
