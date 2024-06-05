import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";

export default function HomePage() {
  return (
    <div className="container relative">
      <PageHeader>
        <PageHeaderHeading>Welcome to DevHarmony</PageHeaderHeading>
        <PageHeaderDescription>
          Share and collaborate repositories while engaging in a Discord-like
          community.
        </PageHeaderDescription>
      </PageHeader>
    </div>
  );
}
