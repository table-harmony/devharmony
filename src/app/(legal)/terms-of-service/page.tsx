import TermsOfService from "@/markdown/legal/terms-of-service.mdx";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";

import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata({
  title: "Terms Of Service",
  description: "Legal agreement between us and our users.",
});

export default function TermsOfServicePage() {
  return (
    <div className="container max-w-4xl">
      <PageHeader>
        <PageHeaderHeading>Terms of service</PageHeaderHeading>
        <PageHeaderDescription>
          Legal agreement between us and our users.
        </PageHeaderDescription>
      </PageHeader>
      <article className="prose max-w-2xl dark:prose-invert">
        <TermsOfService />
      </article>
    </div>
  );
}
