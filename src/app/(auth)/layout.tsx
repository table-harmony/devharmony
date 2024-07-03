export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="py-20">{children}</div>;
}
