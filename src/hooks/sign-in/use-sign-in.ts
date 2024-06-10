'use client';
import { ToastNotify } from "@/components/global/ToastNotify";
import { userLoginProps, userLoginSchema } from "@/schema/sign-in/auth-schema-for-login";
import { useSignIn } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const useSignInHook = () => {
  const { isLoaded, setActive, signIn } = useSignIn();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<userLoginProps>({
    resolver: zodResolver(userLoginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = form.handleSubmit(async (data: userLoginProps) => {
    alert('dfdf')
    if (!isLoaded) return;
    setLoading(true);
    try {
      const res = await signIn.create({
        identifier: data.email,
        password: data.password,
      });
      if (res.status === "complete") {
        await setActive({ session: res.createdSessionId });
        ToastNotify({
          title: "Success",
          desc: "Logged in successfully",
        });
        setLoading(false);
        router.push("/dashboard");
      }
    } catch (error: any) {
      setLoading(false);
      if (error.errors[0].code === "form_password_incorrect") {
        ToastNotify({
          title: "Oopse!",
          desc: "Invalid input credentials ! Try again",
        });
      }
    }
  });
  return {
    handleSubmit,
    form,
    loading,
  }
};
