"use client";
import { UserAuth, userAuthSchema } from "@/schema/sign-up/auth";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastNotify } from "@/components/global/ToastNotify";
import { completeUserReg } from "@/actions/auth";
export const useSignUpForm = () => {
  const [loading, setLoading] = useState(false);
  const { signUp, setActive, isLoaded } = useSignUp();
  const router = useRouter();
  const form = useForm<UserAuth>({
    resolver: zodResolver(userAuthSchema),
    mode: "onChange",
    defaultValues: {
      confirmEmail: "",
      confirmPassword: "",
      email: "",
      password: "",
      fullName: "",
      otp: "",
      type: "owner",
    },
  });
  const generateOtp = async (
    email: string,
    password: string,
    next: React.Dispatch<React.SetStateAction<number>>
  ) => {
    if (!isLoaded) return;
    try {
      await signUp.create({
        emailAddress: email,
        password: password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      next((prev) => prev + 1);
    } catch (err: any) {
      ToastNotify({
        title: "Oopse!",
        desc: `${err.errors[0].message}`,
      });
    }
  };
  const handleSubmit = form.handleSubmit(async (data: UserAuth) => {
    if (!isLoaded) return;
    try {
      setLoading(true);
      const res = await signUp.attemptEmailAddressVerification({
        code: data.otp,
      });
      if (res.status === "complete") {
        if (!res.createdUserId) return;
        const registered = await completeUserReg(
          data.fullName,
          signUp.createdUserId!,
          data.type
        );
        if (registered?.status == 200 && registered.user) {
          await setActive({ session: res.createdSessionId });
        }
        setLoading(false);
        router.push("/dashboard");
      } else {
        return { message: "Invalid code or credentials" };
        setLoading(false);
      }
    } catch (err: any) {
      ToastNotify({
        title: "Oopse!",
        desc: `${err.errors[0].message}`,
      });
      setLoading(false)
    }
  });

  return {
    form,
    generateOtp,
    handleSubmit,
    loading,
  };
};
