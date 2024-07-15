import { env } from "@/env";
import { unstable_noStore } from "next/cache";
import { format } from "date-fns";

import { MDXRemote } from "next-mdx-remote/rsc";

import Image from "next/image";

type ChangeLog = {
  id: string;
  date: string;
  title: string;
  post: string;
};

const projectId = env.NEXT_PUBLIC_PLANNER_ID;

export async function ChangelogList() {
  unstable_noStore();

  const changelogs = await fetch(
    `https://projectplannerai.com/api/changelog?projectId=j5701hxfwpmeqn625rjqgestb16qvhe0`,
  ).then(async (res) => res.json() as Promise<ChangeLog[]>);

  return (
    <>
      {changelogs.length === 0 && (
        <div className="flex w-full flex-col items-center justify-center space-y-10 rounded-lg border border-muted-foreground/20 bg-primary-foreground/50 py-16">
          <p className="text-balance text-lg font-semibold md:text-xl">
            No changelogs found.
          </p>
          <Image
            src="/assets/posts.svg"
            width="300"
            height="300"
            alt="no posts"
          />
        </div>
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
                  <div className="prose dark:prose-invert">
                    <MDXRemote source={changelog.post} />
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
