"use client";
import { USER_LOGIN_FORM } from "@/constants/forms";
import React from "react";
import { FieldValues, UseFormRegister, useForm } from "react-hook-form";
import FormGenerator from "../form-generator/sign-up-details";

const LoginForm = () => {
  const {
    register,
    formState: { errors },
  } = useForm();
  return (
    <div>
      <h2 className="text-limeGreen md:text-4xl font-bold">Login</h2>
      <p className="md:text-sm text-muted-foreground">
        you will receive an OTP on your registered email
      </p>
      {USER_LOGIN_FORM.map((field) => (
        <div 
        className="mt-3"
        key={field.id}
        >
        <FormGenerator
          errors={errors}
          {...field}
          register={register}
          name={field.name}
        />
        </div>
      ))}
    </div>
  );
};

export default LoginForm;
