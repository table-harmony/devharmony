"use client";

import { CardWrapper } from "../_components/card-wrapper";
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

export const LogoutForm = () => {
  return (
    <CardWrapper headerLabel="Logout" backButtonLabel="Back" backButtonHref="/">
      <div className="flex flex-col text-center gap-4">
        Are you sure you want to logout ?
        <Button
          onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
          className="w-full"
        >
          Logout
        </Button>
      </div>
    </CardWrapper>
  );
};
