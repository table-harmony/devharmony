import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function SchoolsPagination({
  page,
  totalPages,
  search,
}: {
  page: number;
  totalPages: number;
  search: string;
}) {
  return (
    <Pagination>
      <PaginationContent>
        {page > 1 && (
          <>
            <PaginationItem>
              <PaginationPrevious
                href={`/schools?page=${page - 1}&search=${search}`}
              />
            </PaginationItem>

            {page > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationLink
                isActive={false}
                href={`/schools?page=${page - 1}&search=${search}`}
              >
                {page - 1}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationLink isActive={true} href={`/schools?page=${page}`}>
            {page}
          </PaginationLink>
        </PaginationItem>

        {page < totalPages && (
          <>
            <PaginationItem>
              <PaginationLink
                href={`/schools?page=${page + 1}&search=${search}`}
              >
                {page + 1}
              </PaginationLink>
            </PaginationItem>

            {page < totalPages - 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext
                href={`/schools?page=${page + 1}&search=${search}`}
              />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>
  );
}
