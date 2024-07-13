import { Suspense } from "react";

import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { SearchForm } from "./_components/search-form";
import { SchoolList, SchoolListSkeleton } from "./_components/school-list";

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: { search?: string; page?: string };
}) {
  const search = searchParams.search;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>Browse schools</PageHeaderHeading>
        <PageHeaderDescription>
          View our comprehensive list of schools.
        </PageHeaderDescription>
        <PageActions className="flex w-full flex-col justify-between gap-2 sm:flex-row">
          <SearchForm search={search} />
        </PageActions>
      </PageHeader>

      <Suspense fallback={<SchoolListSkeleton />}>
        <SchoolList page={page} search={search} />
      </Suspense>
    </div>
  );
}
