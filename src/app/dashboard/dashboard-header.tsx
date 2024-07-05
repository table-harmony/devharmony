import { TablesDropdownMenu } from "./menu";

export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-extrabold md:text-3xl xl:text-4xl">
          Dashboard
        </h1>
        <p className="max-w-xs text-muted-foreground">
          Effortlessly manage, edit, and delete data from the servers.
        </p>
      </div>
      <TablesDropdownMenu />
    </header>
  );
}
