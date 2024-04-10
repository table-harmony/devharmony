import Link from "next/link";

import { Button, ButtonProps } from "@/components/ui/button";

export function LoginButton({ className, children, ...props }: ButtonProps) {
  return (
    <Button className={className} {...props}>
      <Link href="/api/auth/signin">{children}</Link>
    </Button>
  );
}
