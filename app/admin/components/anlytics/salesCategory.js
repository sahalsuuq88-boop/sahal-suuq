"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import { salesCategoryData } from "../../lib/anlyticsData";

const COLORS = [
  "#3b82f6",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
];

export default function SalesCategory() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Sales by Category</CardTitle>
      </CardHeader>

      <CardContent className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={salesCategoryData}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={3}
            >
              {salesCategoryData.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}