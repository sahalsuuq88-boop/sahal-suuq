"use client";

import { useUser } from "../../../hook/useUser";
import { Button } from "@/components/ui/button";

export function DangerZone() {
  const {logOut} = useUser()
  return (
    <div className="rounded-xl border border-red-300 p-6 space-y-4">
      <h2 className="text-xl font-semibold text-red-600">
        Danger Zone
      </h2>

      <p className="text-sm text-muted-foreground">
        These actions are irreversible.
      </p>

      <Button variant="destructive" onClick={()=> logOut}>
        Delete Account
      </Button>
    </div>
  );
}