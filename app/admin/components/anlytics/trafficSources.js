import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Progress } from "@/components/ui/progress";

import { trafficSources } from "../../lib/anlyticsData";

export default function TrafficSources() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Traffic Sources</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {trafficSources.map((item) => (
          <div key={item.source}>
            <div className="mb-2 flex justify-between">
              <span>{item.source}</span>
              <span>{item.percentage}%</span>
            </div>

            <Progress value={item.percentage} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}