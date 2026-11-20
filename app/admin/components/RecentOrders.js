"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function RecentOrders({ orders = [] }) {
  const router = useRouter();

  return (
    <div className="mt-5 rounded-[20px] border border-gray-100 bg-white p-[18px] shadow-sm">
      
      <div className="mb-[18px] flex items-center justify-between">
        
        <h2 className="text-lg font-bold text-gray-900">
          Recent Orders
        </h2>

        <button
          onClick={() => router.push("/admin/orders")}
          className="text-[13px] font-bold text-[#C8A96E] transition hover:opacity-70"
        >
          View All
        </button>

      </div>

      {orders.length > 0 ? (
        orders.map((order) => (
          <div
            key={order._id}
            className="flex items-center justify-between border-b border-gray-100 py-3 last:border-none"
          >
            
            <div>
              <p className="font-bold text-gray-900">
                #{order._id?.slice(-6)}
              </p>

              <p className="mt-1 text-xs text-gray-400">
                {order.user?.name || "Unknown Customer"}
              </p>
            </div>

            <div className="text-right">
              <p className="font-bold text-gray-900">
                ${order.totalPrice}
              </p>

              <p className="mt-1 text-xs text-green-600">
                {order.status}
              </p>
            </div>

          </div>
        ))
      ) : (
        <div className="py-10 text-center">
          <p className="text-sm text-gray-400">
            No recent orders
          </p>
        </div>
      )}

    </div>
  );
}