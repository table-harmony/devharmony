"use server";

import { runQuery } from "@/data-access";
import { runQueryUseCase } from "@/use-cases";

export const runQueryAction = async (query: string) => {
  try {
    const res = await runQueryUseCase({ runQuery: runQuery }, { query: query });
    return { res: res };
  } catch (err) {
    const error = err as Error;
    return { error: error.message };
  }
};
