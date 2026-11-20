"use client";

import useUsers from "../../../hook/userUse";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function SecuritySettings() {
  const { action } = useUsers();

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setPassword({
      ...password,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (password.newPassword !== password.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    await action("changePassword", {
      currentPassword: password.currentPassword,
      newPassword: password.newPassword,
    });

    alert("Password changed");
  };
  return (
    <div className="rounded-xl border bg-background p-6 space-y-6">
      <h2 className="text-xl font-semibold">Security</h2>

      <div className="space-y-4">
        <div>
          <Label>Current Password</Label>
          <Input type="password" onChange={handleChange} />
        </div>

        <div>
          <Label>New Password</Label>
          <Input type="password" onChange={handleChange} />
        </div>

        <div>
          <Label>Confirm Password</Label>
          <Input type="password" onChange={handleChange} />
        </div>
      </div>

      <Button>Change Password</Button>
    </div>
  );
}
