import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";

export default async function Home() {
  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Welcome to TableHarmony</PageHeaderHeading>
        <PageHeaderDescription>
          Share, Collaborate, and Engage with Ease. Accessible, Open Source, and
          Fun-filled.
        </PageHeaderDescription>
        <PageActions></PageActions>
      </PageHeader>
    </>
  );
}
