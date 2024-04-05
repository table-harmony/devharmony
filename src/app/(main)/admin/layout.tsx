import { RoleGate } from "@/components/role-gate";
import Sidebar from "./_components/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGate allowedRole="ADMIN">
      <div className="flex gap-4 p-2">
        <Sidebar />
        {children}
      </div>
    </RoleGate>
  );
}
