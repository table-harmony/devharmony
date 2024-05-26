import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MagicLinkLoginErrorPage({
  searchParams,
}: {
  searchParams: {
    error: string;
  };
}) {
  return (
    <div className="container relative md:max-w-lg space-y-6">
      <header className="text-center">
        <h1 className="font-medium text-3xl">Something went wrong !!!</h1>
        <p className="text-sm text-muted-foreground">{searchParams.error}</p>
      </header>
      <Button asChild className="w-full">
        <Link href="/auth/login">Try Again!</Link>
      </Button>
    </div>
  );
}
