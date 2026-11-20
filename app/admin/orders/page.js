"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, Loader2, ShoppingBag } from "lucide-react";
import OrdersRow from "../components/orders/OrdersRow";
import useOrders from "../../hook/useOrders";

export default function OrdersPage() {
  const {
    items: orders,
    loading,
    error,
    getAll,
    update,
    remove,
  } = useOrders();

  const [search, setSearch] = useState("");

  useEffect(() => {
    getAll();
  }, []);

  const filteredOrders = useMemo(() => {
    const sortedOrders = [
      ...(Array.isArray(orders) ? orders : []),
    ].sort((a, b) => {
      const dateA = new Date(a?.createdAt || 0).getTime();
      const dateB = new Date(b?.createdAt || 0).getTime();

      return dateB - dateA;
    });

    const query = String(search || "")
      .toLowerCase()
      .trim();

    return sortedOrders.filter((order) => {
      const customerName = String(
        order?.user?.name ||
          order?.shippingAddress?.fullName ||
          ""
      ).toLowerCase();

      const orderId = String(
        order?._id || ""
      ).toLowerCase();

      const status = String(
        order?.status || ""
      ).toLowerCase();

      const paymentStatus = String(
        order?.paymentStatus || ""
      ).toLowerCase();

      return (
        customerName.includes(query) ||
        orderId.includes(query) ||
        status.includes(query) ||
        paymentStatus.includes(query)
      );
    });
  }, [orders, search]);

  return (
    <div className="min-h-full bg-[#F8F7F4] p-5 md:p-6 lg:p-8">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-[#222]">
          Orders
        </h1>

        <p className="mt-1 text-sm text-[#777]">
          Manage all customer orders
        </p>
      </div>

      {/* SEARCH */}
      <div className="mb-5 flex h-12 items-center rounded-xl border border-[#E7E5E4] bg-white px-4">
        <Search
          size={19}
          className="shrink-0 text-[#999]"
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search orders..."
          className="ml-3 w-full bg-transparent text-sm text-[#2D2417] outline-none placeholder:text-[#999]"
        />
      </div>

      {/* CONTENT */}
      {loading ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center">
          <Loader2
            size={32}
            className="animate-spin text-[#2D2417]"
          />

          <p className="mt-3 text-sm text-[#78716C]">
            Loading orders...
          </p>
        </div>
      ) : error ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl bg-white p-6">
          <p className="text-lg font-bold text-red-600">
            Could not load orders
          </p>

          <p className="mt-2 text-center text-sm text-[#78716C]">
            {String(error)}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order, index) => (
              <OrdersRow
                key={
                  order?._id ||
                  order?.id ||
                  index
                }
                order={order}
                update={update}
                remove={remove}
                getAll={getAll}
              />
            ))
          ) : (
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl bg-white">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F5F1EA]">
                <ShoppingBag
                  size={25}
                  className="text-[#2D2417]"
                />
              </div>

              <h3 className="mt-4 text-lg font-bold text-[#2D2417]">
                No orders found
              </h3>

              <p className="mt-1 text-center text-sm text-[#999]">
                Try another customer name, order ID or status.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}