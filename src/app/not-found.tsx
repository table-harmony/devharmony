"use client";

import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center">
      <PageHeader>
        <PageHeaderHeading>
          Uhoh, this route wasn&apos;t found
        </PageHeaderHeading>
      </PageHeader>

      <Image
        src="/assets/not-found.svg"
        width="300"
        height="300"
        alt="not found"
      />
    </div>
  );
}
