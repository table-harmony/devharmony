import { searchSchoolsUseCase } from "@/use-cases/schools";

import Image from "next/image";
import { Suspense } from "react";
import { AdvancedPagination } from "@/components/advanced-pagination";
import {
  SchoolCard,
  SchoolCardSkeleton,
} from "../../schools/_components/school-card";
import { cardStyles, gridStyles } from "@/styles/common";

function SchoolListSkeleton() {
  return (
    <div className={gridStyles}>
      {new Array(9).fill("").map((v, idx) => (
        <SchoolCardSkeleton key={idx} />
      ))}
    </div>
  );
}

async function SchoolList({ search, page }: { search?: string; page: number }) {
  const perPage = 2;
  const { data, total } = await searchSchoolsUseCase(
    search ?? "",
    page,
    perPage,
  );

  if (data.length === 0) {
    return (
      <div className={cardStyles}>
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
      <div className={gridStyles}>
        {data.map((school) => (
          <SchoolCard
            key={school.id}
            school={school}
            studentsCount={school.students.length}
            teachersCount={school.teachers.length}
          />
        ))}
      </div>

      <AdvancedPagination page={page} totalPages={Math.ceil(total / perPage)} />
    </div>
  );
}

export function SchoolListWrapper({
  page,
  search,
}: {
  page: number;
  search?: string;
}) {
  return (
    <Suspense fallback={<SchoolListSkeleton />}>
      <SchoolList page={page} search={search} />
    </Suspense>
  );
}
