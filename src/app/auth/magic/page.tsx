export default function MagicLinkLoginPage() {
  return (
    <div className="container relative md:max-w-lg space-y-6">
      <header className="text-center">
        <h1 className="font-medium text-3xl">Magic Link sent!</h1>
        <p className="text-sm text-muted-foreground">
          A magic link has been sent to your email address. Please check your
          inbox to login.
        </p>
      </header>
    </div>
  );
}
