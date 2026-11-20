"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Tooltip,
  CartesianGrid,
  XAxis,
} from "recharts";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { ordersData } from "../../lib/anlyticsData";

export default function OrdersChart() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Orders</CardTitle>
      </CardHeader>

      <CardContent className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={ordersData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <Tooltip />

            <Bar
              dataKey="orders"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}