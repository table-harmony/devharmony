"use client";

import Image from "next/image";

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center space-y-12 py-20">
      <h1 className="text-2xl font-extrabold md:text-3xl xl:text-4xl">
        Uhoh, this route wasn&apos;t found
      </h1>
      <Image
        src="/empty-state/mountain.svg"
        width="200"
        height="200"
        alt="no data"
      />
    </div>
  );
}
