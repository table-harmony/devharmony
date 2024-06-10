import Link from "next/link";

import { validateRequest } from "@/lib/auth";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SettingsIcon } from "lucide-react";

async function Links() {
  const { user } = await validateRequest();

  return (
    <div className="mr-4 hidden items-center gap-8 md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user?.image || "/"} alt="profile" />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
        <span className="hidden font-bold sm:inline-block">
          {user?.username}
        </span>
      </Link>
      <Link href="/account-settings" className="flex items-center">
        <SettingsIcon className="mr-2 h-4 w-4" />
        Account Settings
      </Link>
    </div>
  );
}

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader links={<Links />} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
