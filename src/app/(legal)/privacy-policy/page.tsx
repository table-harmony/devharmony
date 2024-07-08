import PrivacyPolicy from "@/markdown/legal/privacy-policy.mdx";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";

import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description: "Legal document informing you of our policies and procedures",
});

export default function PrivacyPolicyPage() {
  return (
    <div className="container max-w-4xl">
      <PageHeader>
        <PageHeaderHeading>Privacy policy</PageHeaderHeading>
        <PageHeaderDescription>
          Legal document informing you of our policies and procedures.
        </PageHeaderDescription>
      </PageHeader>
      <article className="prose max-w-2xl dark:prose-invert">
        <PrivacyPolicy />
      </article>
    </div>
  );
}
