export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="py-2 md:py-20">{children}</main>
    </>
  );
}
