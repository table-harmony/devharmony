import Contact from "@/markdown/product/contact.mdx";

import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata({
  title: "Contact us",
  description: "Inform us on the website",
});

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12">
      <article className="prose w-full max-w-2xl pb-10 dark:prose-invert">
        <Contact />
      </article>
    </div>
  );
}
