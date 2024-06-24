"use client";
import FormGenerator from "@/components/forms/form-generator/sign-up-details";
import GradientText from "@/components/global/gradient-text";
import { Loader } from "@/components/global/loader";
import Section from "@/components/settings/section";
import { Button } from "@/components/ui/button";
import { useChangePassword } from "@/hooks/settings/change-password";
import React from "react";

type Props = {};

const ChangePassword = (props: Props) => {
  const { errors, handleChangePassword, loading, register } =
    useChangePassword();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
      <div className="lg:col-span-1">
        <h2 className="font-semibold flex flex-col">
          <GradientText size="text-[2rem]" from="red" to="blue">
            Change Password
          </GradientText>
          <p className="text-muted-foreground">reset your password</p>
        </h2>
      </div>
      <form onSubmit={handleChangePassword} className="lg:col-span-4">
        <div className="lg:w-[500px] flex flex-col gap-3">
          <FormGenerator
            register={register}
            errors={errors}
            placeholder="New Password"
            name="password"
            type="text"
            inputType="input"
          />
          <FormGenerator
            register={register}
            errors={errors}
            placeholder="Confirm Password"
            name="confirmPassword"
            type="text"
            inputType="input"
          />
          <Button
            className="bg-stone-600 text-white hover:text-gray-700 font-semibold"
            type="submit"
          >
            <Loader loading={loading}>Update</Loader>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
