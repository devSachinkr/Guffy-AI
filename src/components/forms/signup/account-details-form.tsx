"use client";
import { USER_REGISTRATION_FORMS } from "@/constants/forms";
import React from "react";
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import FormGenerator from "../form-generator/sign-up-details";

interface Props {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}

const AccountDetailsForm = ({ errors, register }: Props) => {
  return (
    <>
      <h2 className="text-limeGreen md:text-4xl font-bold">Account Details</h2>
      <p className="text-iridium md:text-sm text-muted-foreground">
        Enter your account details
      </p>
      {USER_REGISTRATION_FORMS.map((field) => (
        <FormGenerator
          key={field.id}
          {...field}
          register={register}
          errors={errors}
          name={field.name}
        />
      ))}
    </>
  );
};

export default AccountDetailsForm;
