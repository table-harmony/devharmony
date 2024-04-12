import { Button, ButtonProps } from "@/components/ui/button";
import Link from "next/link";

interface LoginButtonProps {
  children: React.ReactNode;
  props?: ButtonProps;
}

export const LoginButton = ({ children, ...props }: LoginButtonProps) => {
  return (
    <Button variant="outline" {...props}>
      <Link href="/api/auth/signin">{children}</Link>
    </Button>
  );
};
