import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function StatCard({
  title,
  value,
  change,
  positive,
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <p className="text-sm text-muted-foreground">
          {title}
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          {value}
        </h2>

        <div
          className={`mt-4 flex items-center gap-2 text-sm ${
            positive
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {positive ? (
            <ArrowUpRight className="h-4 w-4" />
          ) : (
            <ArrowDownRight className="h-4 w-4" />
          )}

          {change}
        </div>
      </CardContent>
    </Card>
  );
}