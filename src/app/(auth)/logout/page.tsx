import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { LogoutForm } from "./form";

export default function LogoutPage() {
  return (
    <div className="container max-w-lg">
      <PageHeader variant="center">
        <PageHeaderHeading>Logout</PageHeaderHeading>
        <PageHeaderDescription>
          You are about to sign out of your account.
        </PageHeaderDescription>
        <PageActions className="flex justify-center">
          <LogoutForm />
        </PageActions>
      </PageHeader>
    </div>
  );
}
