import { redirect } from "next/navigation";

export default async function SettingsPage() {
  redirect("/account-settings/profile");
}
