'use client';
import { Loader } from "@/components/global/loader";
import { AuthProvider } from "@/context/use-auth-context";
import { useSignInHook } from "@/hooks/sign-in/use-sign-in";
import React from "react";
import { FormProvider } from "react-hook-form";

type Props = {
  children: React.ReactNode;
};

const SignInForm = ({ children }: Props) => {
  const { form, handleSubmit, loading } = useSignInHook();

  return <AuthProvider>
    <FormProvider {...form}>
      <form onSubmit={handleSubmit} className="h-full">
        <Loader loading={loading} >{children}</Loader>
      </form>
    </FormProvider>
  </AuthProvider>; 
};
     
export default SignInForm;
