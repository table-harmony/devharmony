import { models } from "../models";
import { Table } from "../_components/table";
import { redirect } from "next/navigation";

export async function generateStaticParams() {
  return Object.keys(models).map((model) => ({
    model: model,
  }));
}

interface ModelPageProps {
  params: {
    model: keyof typeof models;
  };
}

export default async function ModelPage({ params }: ModelPageProps) {
  if (!Object.keys(models).includes(params.model)) redirect("/admin");

  return <Table table={params.model} />;
}
