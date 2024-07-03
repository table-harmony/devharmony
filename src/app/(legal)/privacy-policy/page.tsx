import PrivacyPolicy from "../../../../content/legal/privacy-policy.mdx";

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12">
      <article className="prose dark:prose-invert w-full max-w-2xl pb-10">
        <PrivacyPolicy />
      </article>
    </div>
  );
}
