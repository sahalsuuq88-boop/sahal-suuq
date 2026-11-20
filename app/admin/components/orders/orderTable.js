"use client";

import { useEffect, useState } from "react";
import { OrdersRow } from "./OrdersRow";
import useOrders from "../../../hook/useOrders";

export function OrdersTable() {
  const [search, setSearch] = useState("");

  const {
    items: orders,
    loading,
    error,
    getAll,
    create,
    update,
    remove,
  } = useOrders();

  console.log("orders", orders);

  useEffect(() => {
    getAll();
  }, []);

  // Search-ka oo la hagaajiyay (Wuxuu baaraa Magaca, Ciwaanka, iyo ID-ga)
  const filteredOrders = (orders || []).filter((order) => {
    if (!order) return false;
    const customerName = order.user?.name || "";
    const fullName = order.shippingAddress?.fullName || "";
    const orderId = order._id || "";
    const query = search.toLowerCase();

    return (
      customerName.toLowerCase().includes(query) ||
      fullName.toLowerCase().includes(query) ||
      orderId.toLowerCase().includes(query)
    );
  });

  if (loading) {
    return <p className="p-4">Loading orders...</p>;
  }

  if (error) {
    return <p className="p-4 text-red-500">{error}</p>;
  }

  return (
    <div className="space-y-4">
      <input
        placeholder="Search orders..."
        className="w-full border rounded px-3 py-2"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-hidden rounded-xl border bg-background">
        <table className="w-full">
          <thead className="bg-[#C8A96E]">
            <tr>
              <th className="px-6 py-4 text-left">
                Order ID
              </th>

              <th className="px-6 py-4 text-left">
                Customer
              </th>

              <th className="px-6 py-4 text-left">
                Total
              </th>

              <th className="px-6 py-4 text-left">
                Status
              </th>

              <th className="px-6 py-4 text-left">
                Payment
              </th>
              <th className="px-6 py-4 text-left">
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((order) => (
              <OrdersRow
                key={order._id}
                order={order}
                create={create}
                update={update}
                remove={remove}
                getAll={getAll}
              />
            ))}

            {filteredOrders.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6"
                >
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}