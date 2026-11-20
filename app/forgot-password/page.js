"use client";

import { useState } from "react";
import useUsers from "../hook/userUse";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  const { action } = useUsers();

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await action("forgotPassword", {
        email,
      });

      console.log(res);

      alert("Password reset link sent");
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md border rounded-xl p-6 space-y-5">
        <h1 className="text-2xl font-bold">Forgot Password</h1>

        <p className="text-sm text-muted-foreground">
          Enter your email to reset your password.
        </p>

        <div>
          <Label>Email</Label>

          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@gmail.com"
          />
        </div>

        <Button onClick={handleSubmit} disabled={loading} className="w-full">
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>
      </div>
    </div>
  );
}
