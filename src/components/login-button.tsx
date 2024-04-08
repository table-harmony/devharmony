import { Button } from "@/components/ui/button";
import Link from "next/link";

export const LoginButton = () => {
  return (
    <Button variant="outline">
      <Link href="/api/auth/signin">Login</Link>
    </Button>
  );
};
