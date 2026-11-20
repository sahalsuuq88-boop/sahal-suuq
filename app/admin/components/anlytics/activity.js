import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { activities } from "../../lib/anlyticsData";

export default function ActivityTimeline() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-5">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3"
            >
              <div className="mt-1 h-3 w-3 rounded-full bg-blue-500" />

              <div>
                <p className="font-medium">
                  {activity.title}
                </p>

                <p className="text-sm text-muted-foreground">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}