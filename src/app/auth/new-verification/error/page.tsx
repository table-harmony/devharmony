export default function NewVerificationErrorPage({
  searchParams,
}: {
  searchParams: {
    error: string;
  };
}) {
  return (
    <div className="container relative md:max-w-lg space-y-6">
      <header className="text-center">
        <h1 className="font-medium text-3xl">Something went wrong !!!</h1>
        <p className="text-sm text-muted-foreground">{searchParams.error}</p>
      </header>
    </div>
  );
}
