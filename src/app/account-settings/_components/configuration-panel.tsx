export function ConfigurationPanel({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <article className="rounded-md border">
      <header className="border-b bg-muted px-4 py-2 sm:px-6 md:py-3">
        <span className="font-base mb-4 text-base sm:text-lg">{title}</span>
      </header>
      <div className="space-y-4 p-4 sm:px-6">
        <p className="text-sm text-muted-foreground sm:text-base">{subtitle}</p>
        {children}
      </div>
    </article>
  );
}
