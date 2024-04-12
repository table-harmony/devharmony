import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";

export default function Home() {
  return (
    <PageHeader>
      <PageHeaderHeading>Welcome to TableHarmony</PageHeaderHeading>
      <PageHeaderDescription>
        Share and collaborate repositories while engaging in a Discord-like
        community.
      </PageHeaderDescription>
    </PageHeader>
  );
}
