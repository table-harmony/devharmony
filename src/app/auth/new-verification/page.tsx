export default function NewVerificationPage() {
  return (
    <div className="container relative md:max-w-lg space-y-6">
      <header className="text-center">
        <h1 className="font-medium text-3xl">Verification email sent!</h1>
        <p className="text-sm text-muted-foreground">
          A verification email has been sent to your registered email address.
          Please check your inbox to verify your account.
        </p>
      </header>
    </div>
  );
}
