"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import { ProfileSettings } from "./profileSetting";
import { StoreSettings } from "./storeSettings";
import { SecuritySettings } from "./secureSetting";
import { NotificationSettings } from "./notificationSetting";
import { AppearanceSettings } from "./apperanceSetting";
import { DangerZone } from "./dangerZoneSetting";

export function SettingsTabs() {
  return (
    <Tabs defaultValue="profile">
      <TabsList className="grid w-full grid-cols-6 bg-[#C8A96E]">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="store">Store</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="appearance">Appearance</TabsTrigger>
        <TabsTrigger value="danger">Danger</TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <ProfileSettings />
      </TabsContent>

      <TabsContent value="store">
        <StoreSettings />
      </TabsContent>

      <TabsContent value="security">
        <SecuritySettings />
      </TabsContent>

      <TabsContent value="notifications">
        <NotificationSettings />
      </TabsContent>

      <TabsContent value="appearance">
        <AppearanceSettings />
      </TabsContent>

      <TabsContent value="danger">
        <DangerZone />
      </TabsContent>
    </Tabs>
  );
}