import TermsOfService from "@/markdown/legal/terms-of-service.mdx";

import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata({
  title: "Terms Of Service",
  description:
    "Legal agreement between a service provider and a person who wants to use that service",
});

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto max-w-4xl py-12">
      <article className="prose w-full max-w-2xl pb-10 dark:prose-invert">
        <TermsOfService />
      </article>
    </div>
  );
}
