import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function EmailErrorPage({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <div className="container space-y-8 py-12">
      <h1 className="text-4xl font-semibold">Oops! Something went wrong</h1>
      <p className="text-lg">{searchParams.message}</p>
      <Button asChild>
        <Link href="/login">Try again!</Link>
      </Button>
    </div>
  );
}
