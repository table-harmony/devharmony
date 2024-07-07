export default function ResetPasswordEmail() {
  return (
    <div className="container relative space-y-6 md:max-w-lg">
      <header className="text-center">
        <h1 className="text-3xl font-medium">Reset link sent!</h1>
        <p className="text-sm text-muted-foreground">
          A reset email has been sent to your registered email address. Please
          check your inbox to verify your account.
        </p>
      </header>
    </div>
  );
}
