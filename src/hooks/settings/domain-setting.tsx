"use client";
import { useForm } from "react-hook-form";
import { Resolver, zodResolver } from "@hookform/resolvers/zod";
export const useDomainSettings = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(),
    mode: "onChange",
    defaultValues: {},
  });

  return {};
};
