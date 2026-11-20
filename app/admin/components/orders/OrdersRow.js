"use client";

import { useState } from "react";
import {
  Trash2,
  User,
  CalendarDays,
} from "lucide-react";
import OrderStatus from "./OrderSatus";

export default function OrdersRow({
  order,
  update,
  remove,
  getAll,
}) {
  const [deleting, setDeleting] = useState(false);

  const customer =
    order?.user?.name ||
    order?.shippingAddress?.fullName ||
    "Guest";

  const changeStatus = async (newStatus) => {
    try {
      await update(order._id, {
        status: newStatus,
      });

      await getAll();
    } catch (error) {
      console.log(
        "Status update error:",
        error?.response?.data ||
          error?.message
      );
    }
  };

  const handleRemove = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete order #${order?._id?.slice(
        -8
      )}?`
    );

    if (!confirmed) return;

    try {
      setDeleting(true);

      await remove(order._id);
      await getAll();
    } catch (error) {
      console.log(
        "Delete order error:",
        error?.response?.data ||
          error?.message
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-[#F0EEEB] bg-white p-4 md:p-5">
      {/* TOP */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-base font-bold text-[#2D2417]">
            #{order?._id?.slice(-8)}
          </p>

          <div className="mt-1 flex items-center gap-1.5 text-xs text-[#999]">
            <CalendarDays size={13} />

            <span>
              {order?.createdAt
                ? new Date(
                    order.createdAt
                  ).toLocaleDateString()
                : "No date"}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleRemove}
          disabled={deleting}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {deleting ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-600 border-t-transparent" />
          ) : (
            <Trash2 size={18} />
          )}
        </button>
      </div>

      {/* CUSTOMER */}
      <div className="my-4 flex items-center">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#2D2417] text-white">
          {customer ? (
            customer.charAt(0).toUpperCase()
          ) : (
            <User size={18} />
          )}
        </div>

        <div className="ml-3">
          <p className="text-sm font-semibold text-[#2D2417]">
            {customer}
          </p>

          <p className="mt-0.5 text-xs text-[#999]">
            Customer
          </p>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="grid grid-cols-2 gap-4 border-t border-[#EEEEEE] pt-4 md:grid-cols-3">
        {/* TOTAL */}
        <div>
          <p className="text-[11px] text-[#999]">
            Total
          </p>

          <p className="mt-1 text-sm font-bold text-[#2D2417]">
            $
            {Number(
              order?.totalPrice || 0
            ).toFixed(2)}
          </p>
        </div>

        {/* PAYMENT */}
        <div>
          <p className="text-[11px] text-[#999]">
            Payment
          </p>

          <p className="mt-1 text-sm font-bold text-[#2D2417]">
            {order?.paymentStatus ||
              "Pending"}
          </p>
        </div>

        {/* STATUS */}
        <div className="col-span-2 md:col-span-1">
          <p className="mb-1 text-[11px] text-[#999]">
            Status
          </p>

          <OrderStatus
            status={
              order?.status || "Processing"
            }
            onChange={changeStatus}
          />
        </div>
      </div>
    </div>
  );
}