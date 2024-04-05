import type { UserRole } from "@/use-cases";
import { ErrorMessage } from "@/components/error-message";
import { currentRole } from "@/lib/auth";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

export const RoleGate = async ({ children, allowedRole }: RoleGateProps) => {
  const role = await currentRole();

  if (role !== allowedRole) {
    return (
      <div>
        <ErrorMessage message="You do not have permission to view this content!" />
      </div>
    );
  }

  return <>{children}</>;
};
