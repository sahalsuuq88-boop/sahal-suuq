import Image from "next/image";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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

import { topProducts } from "../../lib/anlyticsData";

export default function TopProducts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Products</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Sales</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {topProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      width={48}
                      height={48}
                      className="rounded-lg"
                    />

                    <div>
                      <p className="font-medium">
                        {product.name}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        {product.category}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>{product.sales}</TableCell>

                <TableCell>{product.revenue}</TableCell>

                <TableCell>
                  <Badge
                    variant={
                      product.stock === "In Stock"
                        ? "default"
                        : product.stock === "Low Stock"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {product.stock}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}