import { FC, ReactNode } from "react";
import { z } from "zod";

export function safeRoute<
  T extends z.AnyZodObject,
  X extends (a: Zod.infer<T>) => ReactNode,
>(schema: T, page: X) {
  return (props: any) => {
    //TODO: parse props
    return page(props);
  };
}
