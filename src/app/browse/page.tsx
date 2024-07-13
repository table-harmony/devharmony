import {
  PageActions,
  PageHeader,
  PageHeaderHeading,
} from "@/components/page-header";
import { SearchForm } from "./_components/search-form";
import { SchoolListWrapper } from "./_components/school-list";

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
        <PageActions className="w-full">
          <SearchForm search={search} />
        </PageActions>
      </PageHeader>

      <SchoolListWrapper page={page} search={search} />
    </div>
  );
}
