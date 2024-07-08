import PrivacyPolicy from "@/markdown/legal/privacy-policy.mdx";

import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description: "Legal document informing you of our policies and procedures",
});

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12">
      <article className="prose w-full max-w-2xl pb-10 dark:prose-invert">
        <PrivacyPolicy />
      </article>
    </div>
  );
}
