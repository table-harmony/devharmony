import { models } from "../models";
import { Table } from "../_components/table";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return Object.keys(models).map((model) => ({
    model: model,
  }));
}

interface ModelPageProps {
  params: {
    model: string;
  };
}

export default async function ModelPage({ params }: ModelPageProps) {
  if (!Object.keys(models).includes(params.model)) notFound();

  const model = models[params.model as keyof typeof models];

  return <Table model={model} />;
}
