"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

import useUsers from "../hook/userUse";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function ResetPasswordPage() {
  const { token } = useParams();

  const { action } = useUsers();

  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setPassword({
      ...password,

      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.newPassword !== password.confirmPassword) {
      alert("Passwords do not match");

      return;
    }

    try {
      const res = await action(
        "resetPassword",

        token,

        {
          password: password.newPassword,
        },
      );

      console.log(res);

      alert("Password reset successfully");
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md border rounded-xl p-6 space-y-5">
        <h1 className="text-2xl font-bold">Reset Password</h1>

        <div>
          <Label>New Password</Label>

          <Input
            id="newPassword"
            type="password"
            value={password.newPassword}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label>Confirm Password</Label>

          <Input
            id="confirmPassword"
            type="password"
            value={password.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <Button onClick={handleSubmit} className="w-full">
          Reset Password
        </Button>
      </div>
    </div>
  );
}
