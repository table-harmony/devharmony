"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PacmanLoader } from "react-spinners";

import { CardWrapper } from "../_components/card-wrapper";
import { ErrorMessage } from "@/components/error-message";
import { SuccessMessage } from "@/components/success-message";

import { newVerificationAction } from "./action";
import { DEFAULT_LOGIN } from "@/lib/auth/routes";

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
      backButtonHref={DEFAULT_LOGIN}
    >
      <Suspense>
        <Token />
      </Suspense>
    </CardWrapper>
  );
};
