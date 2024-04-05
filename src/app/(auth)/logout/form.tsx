"use client";

import { CardWrapper } from "../_components/card-wrapper";
import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/auth/routes";
import { signOut } from "next-auth/react";

export const LogoutForm = () => {
  return (
    <CardWrapper
      headerLabel="Logout"
      backButtonLabel="Back"
      backButtonHref={DEFAULT_LOGIN_REDIRECT}
    >
      <div className="flex flex-col text-center gap-4">
        Are you sure you want to logout ?
        <Button onClick={() => signOut()} className="w-full">
          Logout
        </Button>
      </div>
    </CardWrapper>
  );
};
