import { Badge } from "@/components/ui/badge";
import { currentUser } from "@/lib/auth";

export const UserInfo = async () => {
  const user = await currentUser();

  return (
    <>
      <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
        <p className="text-sm font-medium">ID</p>
        <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-muted rounded-md">
          {user?.id}
        </p>
      </div>
      <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
        <p className="text-sm font-medium">Name</p>
        <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-muted rounded-md">
          {user?.name}
        </p>
      </div>
      <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
        <p className="text-sm font-medium">Email</p>
        <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-muted rounded-md">
          {user?.email}
        </p>
      </div>
      <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
        <p className="text-sm font-medium">Role</p>
        <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-muted rounded-md">
          {user?.role}
        </p>
      </div>
      <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
        <p className="text-sm font-medium">Two Factor Authentication</p>
        <Badge variant={user?.isTwoFactorEnabled ? "outline" : "destructive"}>
          {user?.isTwoFactorEnabled ? "ON" : "OFF"}
        </Badge>
      </div>
    </>
  );
};
