"use client";

import { Button } from "@/components/ui/button";

const order = {
  id: "ORD-001",
  customer: "Ahmed Ali",
  email: "ahmed@gmail.com",
  total: 120,
  status: "Pending",
  date: "2026-07-01",
  address: "Hargeisa, Somaliland",
  items: [
    { name: "Nike Air Max", qty: 1, price: 120 },
    { name: "Sock Pack", qty: 2, price: 10 },
  ],
};

export function OrderDetails() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* LEFT */}
      <div className="lg:col-span-2 space-y-4">
        
        {/* Order Info */}
        <div className="border rounded-xl p-4 space-y-2">
          <h2 className="font-semibold">Order Info</h2>

          <p><b>Order ID:</b> {order.id}</p>
          <p><b>Date:</b> {order.date}</p>

          {/* STATUS */}
          <div>
            <b>Status:</b>{" "}
            {order.status === "Pending" && (
              <span className="ml-2 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs">
                Pending
              </span>
            )}
          </div>
        </div>

        {/* ITEMS */}
        <div className="border rounded-xl p-4 space-y-2">
          <h2 className="font-semibold">Products</h2>

          {order.items.map((item, i) => (
            <div
              key={i}
              className="flex justify-between border-b py-2"
            >
              <span>
                {item.name} x {item.qty}
              </span>

              <span>${item.price * item.qty}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className="space-y-4">
        
        {/* Customer */}
        <div className="border rounded-xl p-4 space-y-2">
          <h2 className="font-semibold">Customer</h2>

          <p>{order.customer}</p>
          <p className="text-sm text-muted-foreground">
            {order.email}
          </p>
        </div>

        {/* Address */}
        <div className="border rounded-xl p-4">
          <h2 className="font-semibold">Shipping Address</h2>
          <p className="text-sm">{order.address}</p>
        </div>

        {/* Summary */}
        <div className="border rounded-xl p-4 space-y-2">
          <h2 className="font-semibold">Summary</h2>

          <p className="flex justify-between">
            <span>Total</span>
            <span className="font-bold">${order.total}</span>
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <Button>Mark as Shipped</Button>
          <Button variant="outline">Mark as Delivered</Button>
          <Button variant="destructive">Cancel Order</Button>
        </div>
      </div>
    </div>
  );
}