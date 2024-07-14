import { Skeleton } from "@/components/ui/skeleton";

function DataTablePaginationSkeleton() {
  return (
    <div className="flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto p-1 sm:flex-row sm:gap-8">
      <Skeleton className="h-8 w-[150px]" />
      <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-[100px]" />
          <Skeleton className="h-8 w-[4.5rem]" />
        </div>
        <Skeleton className="h-8 w-[72px]" />
        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-[32px]" />
          <Skeleton className="h-8 w-[32px]" />
          <Skeleton className="hidden h-8 w-[32px] lg:block" />
          <Skeleton className="hidden h-8 w-[32px] lg:block" />
        </div>
      </div>
    </div>
  );
}

function DataTableToolbarSkeleton() {
  return (
    <div className="flex flex-col gap-2.5 md:flex-row md:justify-between">
      <div className="flex gap-2">
        <Skeleton className="h-10 w-full md:w-[300px] lg:w-[350px]" />
        <Skeleton className="h-10 w-[60px] sm:w-[120px] lg:w-[105px]" />
      </div>
      <Skeleton className="h-10 w-[90px]" />
    </div>
  );
}

function DataTableBodySkeleton() {
  return <Skeleton className="h-64 w-full" />;
}

export function DataTableSkeleton() {
  return (
    <div className="w-full space-y-2.5">
      <DataTableToolbarSkeleton />
      <DataTableBodySkeleton />
      <DataTablePaginationSkeleton />
    </div>
  );
}
