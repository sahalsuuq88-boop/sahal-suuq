"use client";

import React from "react";
import {
  DollarSign,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
} from "lucide-react";

const icons = {
  revenue: DollarSign,
  products: Package,
  orders: ShoppingCart,
  customers: Users,
};

export default function StatCard({
  title,
  value,
  change,
  type,
  color = "#C8A96E",
}) {
  const Icon = icons[type] || BarChart3;

  return (
    <div className="w-full rounded-[18px] bg-white p-4 shadow-sm border border-gray-100 ">
      <div
        className="mb-4 flex h-[45px] w-[45px] items-center justify-center rounded-[14px]"
        style={{
          backgroundColor: `${color}20`,
        }}
      >
        <Icon size={25} color={color} />
      </div>

      <p className="text-[13px] text-gray-500">
        {title}
      </p>

      <h3 className="mt-1 text-[22px] font-bold text-gray-900">
        {value}
      </h3>

      <p className="mt-2 text-[12px] font-semibold text-green-600">
        {change}
      </p>
    </div>
  );
}