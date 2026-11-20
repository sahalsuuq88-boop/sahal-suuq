"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { customerGrowthData } from "../../lib/anlyticsData";

export default function CustomerGrowth() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Customer Growth</CardTitle>
      </CardHeader>

      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={customerGrowthData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="customers"
              stroke="#2563eb"
              fill="#93c5fd"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}