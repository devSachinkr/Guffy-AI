"use client";
import { ToastNotify } from "@/components/global/ToastNotify";
import { Loader } from "@/components/global/loader";
import { AuthContext, AuthProvider } from "@/context/use-auth-context";
import { useSignUpForm } from "@/hooks/sign-up/use-sign-up";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
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
