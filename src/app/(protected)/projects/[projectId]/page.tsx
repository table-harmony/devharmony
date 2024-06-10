import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: { projectId: string };
}) {
  return {
    title: params.projectId,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: { projectId: string };
}) {
  if (!params.projectId) notFound();

  return (
    <div className="container space-y-16 pb-24 pt-12 md:py-20 lg:px-20">
      <h1 className="text-balance text-3xl font-bold lg:text-4xl">
        Project: {params.projectId}
      </h1>
    </div>
  );
}
