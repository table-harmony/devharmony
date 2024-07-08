import Link from "next/link";

import { siteConfig } from "@/config/site";

import { Button } from "@/components/ui/button";

import { SignedIn, SignedOut } from "@/components/auth";

import { ArrowRightIcon } from "lucide-react";

export function HeroSection() {
  return (
    <section className="container py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
      <div className="flex flex-col items-center space-y-5 text-center">
        <h1 className="text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl">
          Welcome to {siteConfig.name.toUpperCase()}
        </h1>
        <p className="max-w-3xl font-light text-muted-foreground md:text-lg lg:text-xl">
          {siteConfig.description}
        </p>
        <SignedOut>
          <Button className="w-72" asChild>
            <Link href="/login">
              Get started <ArrowRightIcon className="ml-2 size-4" />
            </Link>
          </Button>
        </SignedOut>
        <SignedIn>
          <Button className="w-72" asChild>
            <Link href="/account-settings/profile">Settings</Link>
          </Button>
        </SignedIn>
      </div>
    </section>
  );
}
