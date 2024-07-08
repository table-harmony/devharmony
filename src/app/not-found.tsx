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
        src="/empty-state/mountain.svg"
        width="200"
        height="200"
        alt="no data"
      />
    </div>
  );
}
