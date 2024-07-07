import { env } from "@/env";

import { siteConfig } from "@/config/site";

import type { Metadata } from "next/types";

export function createMetadata(override: Metadata): Metadata {
  return {
    ...override,
    openGraph: {
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      url: env.NEXT_PUBLIC_APP_URL,
      images: "/banner.png",
      siteName: siteConfig.name,
      ...override.openGraph,
    },
  };
}

export const BASE_URL =
  env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : env.NEXT_PUBLIC_APP_URL;
