import { Skeleton } from "@/components/ui/skeleton";

export function ModelSkeleton() {
  return (
    <div className="flex flex-col space-y-2 p-2">
      <div className="flex justify-between">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[100px]" />
      </div>
      <Skeleton className="h-52" />
    </div>
  );
}
