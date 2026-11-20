"use client";

import { Switch } from "@/components/ui/switch";

export function NotificationSettings() {
  return (
    <div className="rounded-xl border bg-background p-6 space-y-5">
      <h2 className="text-xl font-semibold">
        Notifications
      </h2>

      <div className="flex justify-between">
        <span>Email Notifications</span>

        <Switch />
      </div>

      <div className="flex justify-between">
        <span>Order Notifications</span>

        <Switch />
      </div>

      <div className="flex justify-between">
        <span>Customer Messages</span>

        <Switch />
      </div>

      <div className="flex justify-between">
        <span>Weekly Reports</span>

        <Switch />
      </div>
    </div>
  );
}