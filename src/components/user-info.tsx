import { validateRequest } from "@/lib/auth";

export const UserInfo = async () => {
  const { user } = await validateRequest();

  return (
    <>
      <UserItem title="ID" value={user?.id} />
      <UserItem title="Username" value={user?.username ?? ""} />
      <UserItem title="Email" value={user?.email} />
      <UserItem
        title="Email Verified"
        value={user?.emailVerified?.toLocaleDateString()}
      />
      <UserItem title="Role" value={user?.role} />
    </>
  );
};

function UserItem({ title, value }: { title: string; value?: string }) {
  return (
    <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
      <p className="text-sm font-medium">{title}</p>
      <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-muted rounded-md">
        {value}
      </p>
    </div>
  );
}
