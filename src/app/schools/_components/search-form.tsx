import { redirect } from "next/navigation";

import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";

import { SearchIcon } from "lucide-react";

export function SearchForm({ search }: { search?: string }) {
  return (
    <form
      className="sm:w-96"
      key={search}
      action={async (formData: FormData) => {
        "use server";
        const search = formData.get("search") as string;
        redirect(search ? `/schools?search=${search}` : "/schools");
      }}
    >
      <div className="flex items-center gap-2">
        <Input
          defaultValue={search}
          placeholder="Search..."
          name="search"
          id="school"
        />
        <SubmitButton icon={<SearchIcon className="size-4" />}>
          <span className="sr-only whitespace-nowrap sm:not-sr-only">
            Search
          </span>
        </SubmitButton>
      </div>
    </form>
  );
}
