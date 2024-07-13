import { safeRoute } from "@/utils/safe-route";

import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  params: z.object({
    schoolId: z.number(),
  }),
});

export default safeRoute(schema, async ({ params }) => {
  redirect(`${params.schoolId}/info`);
});
