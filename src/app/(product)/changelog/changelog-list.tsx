import { unstable_noStore } from "next/cache";
import { format } from "date-fns";

import Markdown from "react-markdown";

type ChangeLog = {
  id: string;
  date: string;
  title: string;
  post: string;
};

export async function ChangelogList() {
  unstable_noStore();

  const changelogs = await fetch(
    `https://projectplannerai.com/api/changelog?projectId=j5701hxfwpmeqn625rjqgestb16qvhe0`,
  ).then(async (res) => res.json() as Promise<ChangeLog[]>);

  return (
    <>
      {changelogs.length === 0 && (
        <div className="text-lg">No changelogs found</div>
      )}
      <ul className="flex flex-col">
        {changelogs.map((changelog) => (
          <li
            key={changelog.id}
            className="relative flex w-full flex-col sm:flex-row"
          >
            <div className="flex w-full pb-4 sm:w-[200px] sm:pb-0">
              <p className="sans text-slate-11 text-sm font-normal leading-[1.6]">
                <time className="sticky top-24 text-xl">
                  {format(changelog.date, "PP")}
                </time>
              </p>
            </div>

            <div className="relative hidden sm:flex sm:w-[100px]">
              <div className="absolute left-0.5 top-0.5 h-full w-0.5 bg-slate-200"></div>
              <div className="sticky left-0 top-[102px] mt-1.5 h-1.5 w-1.5 rounded-full bg-white"></div>
            </div>

            <div className="w-full pb-16">
              <div className="space-y-4">
                <div className="flex flex-col gap-4">
                  <h2 className="text-xl font-medium md:text-2xl xl:text-3xl">
                    {changelog.title}
                  </h2>
                  <Markdown className="prose dark:prose-invert">
                    {changelog.post}
                  </Markdown>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
