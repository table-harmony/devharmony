import { currentUser } from "@/lib/auth";

import { Badge } from "@/components/ui/badge";

export const UserInfo = async () => {
  const user = await currentUser();

  return (
    <>
      <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
        <p className="text-sm font-medium">ID</p>
        <p className="truncate text-xs max-w-[180px] p-1 bg-muted rounded-md font-mono">
          {user?.id}
        </p>
      </div>
      <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
        <p className="text-sm font-medium">Name</p>
        <p className="truncate text-xs max-w-[180px] p-1 bg-muted rounded-md font-mono">
          {user?.name}
        </p>
      </div>
      <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
        <p className="text-sm font-medium">Email</p>
        <p className="truncate text-xs max-w-[180px] p-1 bg-muted rounded-md font-mono">
          {user?.email}
        </p>
      </div>
      <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
        <p className="text-sm font-medium">Role</p>
        <p className="truncate text-xs max-w-[180px] p-1 bg-muted rounded-md font-mono">
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
