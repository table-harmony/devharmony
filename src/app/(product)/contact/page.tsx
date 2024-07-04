import Contact from "@/markdown/product/contact.mdx";

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12">
      <article className="prose w-full max-w-2xl pb-10 dark:prose-invert">
        <Contact />
      </article>
    </div>
  );
}
