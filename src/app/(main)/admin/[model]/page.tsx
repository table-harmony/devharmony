import { models } from "./models";
import { Table } from "./_components/table";

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
  return <Table table={params.model} />;
}
