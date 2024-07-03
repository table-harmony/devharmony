import TermsOfService from "@/markdown/legal/terms-of-service.mdx";

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto max-w-4xl py-12">
      <article className="prose w-full max-w-2xl pb-10 dark:prose-invert">
        <TermsOfService />
      </article>
    </div>
  );
}
