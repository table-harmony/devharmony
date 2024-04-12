import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";

export default function AdminPage() {
  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Admin</PageHeaderHeading>
        <PageHeaderDescription>
          Administer and access comprehensive database records effortlessly.
        </PageHeaderDescription>
      </PageHeader>
    </>
  );
}
