"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function SettingsTabs() {
  const path = usePathname();
  const currentTab = path.split("/").pop();

  return (
    <Tabs value={currentTab} defaultValue={currentTab}>
      <TabsList className="flex h-auto flex-wrap justify-start space-x-2">
        <TabsTrigger value="profile" asChild>
          <Link href="profile">Profile</Link>
        </TabsTrigger>
        <TabsTrigger value="security" asChild>
          <Link href="security">Security</Link>
        </TabsTrigger>
        <TabsTrigger value="danger" asChild>
          <Link href="danger">Danger</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
