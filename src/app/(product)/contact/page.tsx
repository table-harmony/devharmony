import Contact from "@/markdown/product/contact.mdx";
import { PageHeader, PageHeaderHeading } from "@/components/page-header";

import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata({
  title: "Contact us",
  description: "Inform us on the website",
});

export default function ContactPage() {
  return (
    <div className="container max-w-4xl">
      <PageHeader>
        <PageHeaderHeading>Contact us</PageHeaderHeading>
      </PageHeader>
      <article className="prose max-w-2xl dark:prose-invert">
        <Contact />
      </article>
    </div>
  );
}
