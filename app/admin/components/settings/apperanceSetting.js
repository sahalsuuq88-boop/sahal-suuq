"use client";

import { Button } from "@/components/ui/button";

export function AppearanceSettings() {
  return (
    <div className="rounded-xl border bg-background p-6 space-y-4">
      <h2 className="text-xl font-semibold">
        Appearance
      </h2>

      <p className="text-sm text-muted-foreground">
        Theme options (Dark Mode waxaa ku xiri doonaa marka dambe).
      </p>

      <div className="flex gap-3">
        <Button variant="outline">
          Light
        </Button>

        <Button variant="outline">
          Dark
        </Button>

        <Button variant="outline">
          System
        </Button>
      </div>
    </div>
  );
}