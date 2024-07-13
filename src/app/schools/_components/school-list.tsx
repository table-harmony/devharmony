import { searchSchoolsUseCase } from "@/use-cases/schools";

import Image from "next/image";

import { Skeleton } from "@/components/ui/skeleton";
import { SchoolsPagination } from "./schools-pagination";
import { SchoolCard } from "./school-card";

export function SchoolListSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-8">
      {new Array(6).fill("").map((v, idx) => (
        <div key={idx} className="h-[250px] space-y-6 rounded border p-4">
          <div className="space-y-2">
            <Skeleton className="h-[30px] w-[140px] rounded" />
            <Skeleton className="h-[40px] w-full rounded" />
          </div>
          <div className="flex flex-col items-center justify-center gap-10 md:flex-row">
            <Skeleton className="h-[30px] w-[140px] rounded" />
            <Skeleton className="h-[30px] w-[140px] rounded" />
          </div>
          <Skeleton className="h-[40px] w-full rounded" />
        </div>
      ))}
    </div>
  );
}

export async function SchoolList({
  search,
  page,
}: {
  search?: string;
  page: number;
}) {
  const perPage = 9;
  const { data, total } = await searchSchoolsUseCase(
    search ?? "",
    page,
    perPage,
  );

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-8 rounded-xl bg-muted py-12">
        <Image
          src="/assets/no-data.svg"
          width="200"
          height="200"
          alt="no schools placeholder image"
        />
        <span className="font-semibold">No schools matching your search</span>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {data.map((school) => (
          <SchoolCard
            key={school.id}
            school={school}
            studentsCount={school.students.length}
            teachersCount={school.teachers.length}
          />
        ))}
      </div>

      <div className="flex w-full justify-end">
        <div className="self-end">
          <SchoolsPagination
            page={page}
            totalPages={Math.ceil(total / perPage)}
            search={search ?? ""}
          />
        </div>
      </div>
    </div>
  );
}
