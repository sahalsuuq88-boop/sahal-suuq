import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { recentOrders } from "../../lib/anlyticsData";

export default function RecentOrders() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {recentOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {order.customer
                          .split(" ")
                          .map((name) => name[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <p className="font-medium">
                        {order.customer}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        {order.email}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>{order.id}</TableCell>

                <TableCell>{order.total}</TableCell>

                <TableCell>
                  <Badge
                    variant={
                      order.status === "Delivered"
                        ? "default"
                        : order.status === "Pending"
                        ? "secondary"
                        : order.status === "Processing"
                        ? "outline"
                        : "destructive"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>

                <TableCell>{order.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}