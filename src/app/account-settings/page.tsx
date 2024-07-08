import { redirect } from "next/navigation";

export default async function SettingPage() {
  redirect("/account-settings/profile");
}
