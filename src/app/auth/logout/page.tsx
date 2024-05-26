import { LogoutForm } from "./form";

export default function LogoutPage() {
  return (
    <div className="container relative md:max-w-lg space-y-6">
      <header className="text-center">
        <h1 className="text-xl font-medium md:text-3xl">Logout</h1>
        <p className="text-sm text-muted-foreground">
          You are about to sign out of your account.
        </p>
      </header>
      <LogoutForm />
    </div>
  );
}
