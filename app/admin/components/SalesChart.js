"use client";

import React from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function SalesChart({ data = [] }) {
  return (
    <div className="mt-5 rounded-[20px] border border-gray-100 bg-white p-5 shadow-sm">
      
      <h2 className="text-lg font-bold text-gray-900">
        Revenue Overview
      </h2>

      <p className="mb-5 text-xs text-gray-400">
        Last 6 months
      </p>

      {data.length > 0 ? (
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="month"
                tick={{ fontSize: 12 }}
              />

              <YAxis
                tick={{ fontSize: 12 }}
              />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#DC2626"
                strokeWidth={3}
                dot={{
                  r: 5,
                }}
                activeDot={{
                  r: 7,
                }}
              />

            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex h-[220px] items-center justify-center">
          <p className="text-gray-400">
            No sales data
          </p>
        </div>
      )}
    </div>
  );
}