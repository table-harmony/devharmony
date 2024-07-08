export default function EmailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="grid h-screen md:place-items-center">{children}</div>;
}
