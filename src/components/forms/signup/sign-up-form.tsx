"use client";
import { Loader } from "@/components/global/loader";
import { AuthProvider } from "@/context/use-auth-context";
import { useSignUpForm } from "@/hooks/sign-up/use-sign-up";
import React from "react";
import { FormProvider } from "react-hook-form";
type Props = {
  children: React.ReactNode;
};

const SignUpform = ({ children }: Props) => {
  const { form, handleSubmit, loading } = useSignUpForm();
  return (
    <AuthProvider>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit} className="h-full">
          <Loader loading={loading}>
            <div>{children}</div>
          </Loader>
        </form>
      </FormProvider>
    </AuthProvider>
  );
};

export default SignUpform;
