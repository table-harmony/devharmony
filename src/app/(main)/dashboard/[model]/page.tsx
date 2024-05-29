import { Suspense } from "react";
import { notFound } from "next/navigation";

import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { ModelMenu } from "../_components/model-menu";
import { Model } from "../_components/model";
import { ModelSkeleton } from "../_components/model-skeleton";

import { models } from "../models";

interface ModelPageProps {
  params: {
    model: string;
  };
}

export function generateStaticParams() {
  return Object.keys(models).map((key) => ({
    model: key,
  }));
}

export default async function ModelPagePage({ params }: ModelPageProps) {
  const modelKey = params.model as keyof typeof models;

  if (!(modelKey in models)) {
    notFound();
  }

  return (
    <div className="container relative">
      <PageHeader>
        <PageHeaderHeading>Dashboard</PageHeaderHeading>
        <PageHeaderDescription>
          Administer and access comprehensive database records effortlessly.
        </PageHeaderDescription>
        <PageActions>
          <ModelMenu />
        </PageActions>
      </PageHeader>
      <Suspense fallback={<ModelSkeleton />}>
        <Model modelKey={modelKey} />
      </Suspense>
    </div>
  );
}
