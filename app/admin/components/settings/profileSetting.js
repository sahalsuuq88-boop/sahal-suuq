"use client";
import {useUser} from "../../../hook/useUser";
import  useUsers  from "../../../hook/userUse";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

export function ProfileSettings() {
  const { user } = useUser();
  const { update } = useUsers();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        password: "",
        role: user.role || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const profile = await update(user._id, formData);

      console.log(profile);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile.");
    }
  };
  return (
    <div className="rounded-xl border p-6 space-y-4">
      <h2 className="text-xl font-semibold">Profile Information</h2>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label>Full Name</Label>
          <Input onChange={handleChange} value={formData.name} id="name" placeholder="John Doe" />
        </div>

        <div>
          <Label>Email</Label>
          <Input
            onChange={handleChange}
            value={formData.email} id="email"
            placeholder="john@example.com"
          />
        </div>
        <div>
          <Label>Password</Label>
          <Input
            onChange={handleChange}
            value={formData.password} id="password"
            type="password"
            placeholder="123345"
          />
        </div>

        <div>
          <Label>Role</Label>
          <Input onChange={handleChange} value={formData.role} id="role" placeholder="Admin" />
        </div>
      </div>

      <Button onClick={handleSubmit}>Save Changes</Button>
    </div>
  );
}
