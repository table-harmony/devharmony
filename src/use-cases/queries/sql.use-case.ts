import { runQuery } from "@/use-cases";

export async function runQueryUseCase(
  context: {
    runQuery: runQuery;
  },
  data: { query: string }
): Promise<any> {
  const res = await context.runQuery(data.query);
  return res;
}
