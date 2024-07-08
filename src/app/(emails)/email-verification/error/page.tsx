export default function EmailErrorPage({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  throw new Error(searchParams.message);
}
