"use client";

import { CardWrapper } from "../_components/card-wrapper";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import { PacmanLoader } from "react-spinners";

import { ErrorMessage } from "@/components/error-message";
import { SuccessMessage } from "@/components/success-message";

import { newVerificationAction } from "./action";

export const NewVerificationForm = () => {
  const Token = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
      if (success || error) return;

      if (!token) {
        setError("Missing token!");
        return;
      }
      newVerificationAction(token)
        .then((data) => {
          setSuccess(data.success);
          setError(data.error);
        })
        .catch(() => {
          setError("Something went wrong!");
        });
    }, [token, success, error]);

    useEffect(() => {
      onSubmit();
    }, [onSubmit]);

    return (
      <div className="flex items-center w-full justify-center">
        {!success && !error && <PacmanLoader color="orange" />}
        <SuccessMessage message={success} />
        {!success && <ErrorMessage message={error} />}
      </div>
    );
  };

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/api/auth/signin"
    >
      <Suspense>
        <Token />
      </Suspense>
    </CardWrapper>
  );
};
