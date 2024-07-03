import TermsOfService from "../../../../content/legal/terms-of-service.mdx";

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto max-w-4xl py-12">
      <article className="prose dark:prose-invert w-full max-w-2xl pb-10">
        <TermsOfService />
      </article>
    </div>
  );
}
