"use client";

import { AUTHENTICATION_ERROR_MESSAGE } from "@/utils/errors";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";

export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const isAuthenticationError = error.message.includes(
    AUTHENTICATION_ERROR_MESSAGE,
  );

  return (
    <div className="container mx-auto min-h-screen space-y-8 py-12">
      {isAuthenticationError ? (
        <>
          <PageHeader>
            <PageHeaderHeading>
              Oops! You Need to Be Logged In
            </PageHeaderHeading>
            <PageHeaderDescription>
              To access this page, please log in first.
            </PageHeaderDescription>
            <PageActions>
              <Button asChild>
                <Link href="/login">Login</Link>
              </Button>
            </PageActions>
          </PageHeader>
        </>
      ) : (
        <>
          <PageHeader>
            <PageHeaderHeading>Oops! Something went wrong </PageHeaderHeading>
            <PageHeaderDescription>{error.message}</PageHeaderDescription>
          </PageHeader>
        </>
      )}
    </div>
  );
}
