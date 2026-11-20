"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { revenueData } from "../../lib/anlyticsData";

export default function RevenueChart() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
      </CardHeader>

      <CardContent className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="revenue"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}