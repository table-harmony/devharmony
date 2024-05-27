import { notFound } from "next/navigation";

import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { ModelMenu } from "../_components/model-menu";

import { models } from "../models";
import { Model } from "../_components/model";

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
      <Model modelKey={modelKey} />
    </div>
  );
}
