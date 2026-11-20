"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function StoreSettings() {
  return (
    <div className="rounded-xl border bg-background p-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold">
          Store Settings
        </h2>

        <p className="text-sm text-muted-foreground">
          Update your store information.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label>Store Name</Label>
          <Input placeholder="My Store" />
        </div>

        <div>
          <Label>Store Email</Label>
          <Input placeholder="store@email.com" />
        </div>

        <div>
          <Label>Currency</Label>
          <Input placeholder="USD" />
        </div>

        <div>
          <Label>Time Zone</Label>
          <Input placeholder="Africa/Hargeisa" />
        </div>
      </div>

      <div>
        <Label>Store Address</Label>

        <Input placeholder="Hargeisa, Somaliland" />
      </div>

      <div>
        <Label>Store Logo</Label>

        <Input
          type="file"
          accept="image/*"
        />
      </div>

      <Button>
        Save Store Settings
      </Button>
    </div>
  );
}