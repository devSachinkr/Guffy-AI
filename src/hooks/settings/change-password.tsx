"use client";

import { changePassword } from "@/actions/settings";
import { ToastNotify } from "@/components/global/ToastNotify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ChangePasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be atleast 8 characters long" })
      .refine(
        (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ""),
        "password should contain only alphabets and numbers"
      ),
    confirmPassword: z.string(),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export const useChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const [loading, setLoading] = useState<boolean>(false);
  const handleChangePassword = handleSubmit(
    async (data: z.infer<typeof ChangePasswordSchema>) => {
      try {
        setLoading(true);
        const update = await changePassword(data.password);
        if (update) {
          reset();
          setLoading(false);
          ToastNotify({
            title: "Success",
            desc: `${update.message}`,
          });
        } else {
          setLoading(false);
          ToastNotify({
            title: "Oopse!",
            //@ts-ignore
            desc: `${update.message ?? "Something went wrong"}`,
          });
        }
      } catch (error:any) {
        setLoading(false);
        console.log(error);
        ToastNotify({
          title: "Oopse!",
          desc: `${error.message ?? "Something went wrong"}`,
        });
      }
    }
  );
  return {
    register,
    errors,
    handleChangePassword,
    loading,
  };
};
