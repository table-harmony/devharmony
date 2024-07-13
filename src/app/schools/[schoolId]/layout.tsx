import { getSession } from "@/utils/session";

export default async function SchoolLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { schoolId: string };
}) {
  const { user } = await getSession();

  //TODO: limit user access by his visiblily
  return <>{children}</>;
}
